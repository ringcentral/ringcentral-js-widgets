export const stopPropagation = (e: any) => e.stopPropagation();
export const preventDefault = (e: any) => e.preventDefault();
export const stopDefaultEvents = (e: any) => {
  e.stopPropagation();
  e.preventDefault();
};
