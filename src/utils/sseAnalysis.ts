export const parseSSEData = (rawData: any) => {
    let content = '';
    const events = rawData.split('\n\n');
    for (const eventStr of events) {
        if (!eventStr.trim()) continue;
        const dataLines = eventStr
            .split('\n')
            .filter(line => line.startsWith('data:'));
        if (!dataLines.length) continue;
        const fullData = dataLines
            .map(line => line.replace(/^data:\s*/, ''))
            .join('\n');
        try {
            const json = JSON.parse(fullData);
            if (json.content) {
                content += json.content;
            }
        } catch {
        }
    }
    return content;
}

  