/**
 * Mac 환경인지 확인합니다.
 * Mac 에서 modifier 는 ctrl 이 아닌 command 키이기 때문이기에 확인하는 로직이 필요합니다.
 * @returns Mac 인 경우 true
 */
export default function isMac(): boolean {
  return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
}
