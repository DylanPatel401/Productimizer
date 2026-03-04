export function calculateCompletionRate(tasks) {
  if (!tasks || tasks.length === 0) return 0;
  const completed = tasks.filter(t => t.completed_at && t.completed_at !== "").length;
  return Math.round((completed / tasks.length) * 100);
}

export function calculateStreak(completedTasks) {
  if (!completedTasks || completedTasks.length === 0) return { currentStreak: 0, longestStreak: 0 };

  // Get unique completion dates sorted descending
  const dates = new Set();
  completedTasks.forEach(t => {
    if (t.completed_at && t.completed_at !== "") {
      // Use the task date as a proxy since completed_at is a Firestore timestamp
      dates.add(t.date);
    }
  });

  const sortedDates = [...dates].sort().reverse();
  if (sortedDates.length === 0) return { currentStreak: 0, longestStreak: 0 };

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  // Check if most recent completion is today or yesterday for current streak
  const today = new Date();
  const todayStr = formatDateForCompare(today);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatDateForCompare(yesterday);

  const isCurrentStreak = sortedDates[0] === todayStr || sortedDates[0] === yesterdayStr;

  for (let i = 1; i < sortedDates.length; i++) {
    const prev = parseDate(sortedDates[i - 1]);
    const curr = parseDate(sortedDates[i]);
    const diffDays = Math.round((prev - curr) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      tempStreak++;
    } else {
      if (i === 1 || isCurrentStreak) {
        currentStreak = Math.max(currentStreak, tempStreak);
      }
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak);
  if (isCurrentStreak) currentStreak = Math.max(currentStreak, tempStreak);

  return { currentStreak, longestStreak };
}

export function calculateCategoryBreakdown(tasks) {
  if (!tasks || tasks.length === 0) return [];

  const counts = {};
  tasks.forEach(t => {
    const cat = t.category || 'None';
    counts[cat] = (counts[cat] || 0) + 1;
  });

  const total = tasks.length;
  return Object.entries(counts)
    .map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

export function calculatePriorityBreakdown(tasks) {
  if (!tasks || tasks.length === 0) return [];

  const counts = { high: 0, medium: 0, low: 0, None: 0 };
  tasks.forEach(t => {
    const pri = t.priority || 'None';
    counts[pri] = (counts[pri] || 0) + 1;
  });

  const total = tasks.length;
  return Object.entries(counts)
    .filter(([, count]) => count > 0)
    .map(([priority, count]) => ({
      priority,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

export function calculateWeeklyCompletions(completedTasks) {
  if (!completedTasks || completedTasks.length === 0) return [];

  const days = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = formatDateForCompare(d);
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });

    const count = completedTasks.filter(t => t.date === dateStr).length;
    days.push({ day: dayLabel, date: dateStr, count });
  }

  return days;
}

export function calculateAverageTasksPerDay(completedTasks, days = 30) {
  if (!completedTasks || completedTasks.length === 0) return 0;

  const today = new Date();
  const cutoff = new Date(today);
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = formatDateForCompare(cutoff);

  const recentTasks = completedTasks.filter(t => t.date >= cutoffStr);
  return Math.round((recentTasks.length / days) * 10) / 10;
}

function formatDateForCompare(date) {
  const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
  const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
  return `${date.getFullYear()}/${month}/${day}`;
}

function parseDate(dateStr) {
  const d = dateStr.split('/');
  return new Date(d[0], d[1] - 1, d[2]);
}
