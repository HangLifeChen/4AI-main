export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 bytes';

  const units = ['GB', 'MB', 'KB'];
  const thresholds = [
    1073741824, // 1024^3 (GB)
    1048576,    // 1024^2 (MB)
    1024        // 1024^1 (KB)
  ];

  for (let i = 0; i < units.length; i++) {
    if (bytes >= thresholds[i]) {
      return `${(bytes / thresholds[i]).toFixed(2)} ${units[i]}`;
    }
  }
  return `${bytes} bytes`;
}
