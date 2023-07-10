function xpThresholdForLevel(level: number): number {
    return Math.floor(2 * Math.pow(level, 1.5));
}

export default xpThresholdForLevel;