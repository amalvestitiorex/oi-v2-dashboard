import { keys, size } from "lodash";
import { Record } from "../interfaces/records";

export const sectionKeys = (record?: Record) => {
  return keys(record).filter((key) => {
    if (
      size(record?.[key]) > 0 &&
      (key === "summary" ||
        key === "extended_brief" ||
        key === "tags" ||
        key === "authors" ||
        key === "similar_records" ||
        key === "reviews" ||
        key === "books" ||
        key === "movies" ||
        key === "series" ||
        key === "strong_issues" ||
        key === "weak_issues")
    ) {
      return key;
    }
  });
};
