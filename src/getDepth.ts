export default function getDepth(value: any): number {
  if (Array.isArray(value)) {
    return Math.max(0, ...value.map((v: any) => 1 + getDepth(v)));
  } else if (value && typeof value === 'object') {
    return Math.max(
      0,
      ...Object.keys(value).map(name => 1 + getDepth(value[name])),
    );
  }
  return 0;
}
