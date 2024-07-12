export default function findName(obj: any, slug: string): string | null {
  if (Array.isArray(obj)) {
    for (const item of obj) {
      let answer = findName(item, slug);
      if (answer) {
        return answer;
      }
    }
  } else if (obj && typeof obj === "object") {
    if ("slug" in obj && obj.slug === slug) {
      return obj.name;
    } else {
      // Check if obj has nested objects or arrays
      for (const key in obj) {
        let answer = findName(obj[key], slug);
        if (answer) {
          return answer;
        }
      }
    }
  }
  return null;
}
