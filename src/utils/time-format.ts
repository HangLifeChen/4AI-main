export const formatTimeAgo = (timeStr: number): string => {
  const targetDate = new Date(timeStr * 1000);
  if (isNaN(targetDate.getTime())) {
    return "Invalid time";
  }
  const now = new Date();
  const diffMs = now.getTime() - targetDate.getTime();

  if (diffMs < 0) {
    return "Invalid future time";
  }

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) {
    return `${seconds} ${seconds === 1 ? 'sec' : 'secs'} ago`;
  }

  const minutes = Math.floor(diffMs / (60 * 1000));
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
  }

  const hours = Math.floor(diffMs / (3600 * 1000));
  if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  const days = Math.floor(diffMs / (86400 * 1000));
  if (days < 30) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }

  const years = Math.floor(months / 12);
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
}