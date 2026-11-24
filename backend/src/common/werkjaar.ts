export function huidigWerkjaar(datum = new Date()): number {
  return datum.getMonth() >= 8 ? datum.getFullYear() : datum.getFullYear() - 1;
}