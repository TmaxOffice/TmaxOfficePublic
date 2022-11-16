/* eslint-disable max-classes-per-file */

const uniqueKey = Symbol('class identifier');
let uniqueKeyValue = 0;

export interface IIdentifiable {
  getUniqueKey: () => number;
}

export type UniqueKey = ReturnType<IIdentifiable['getUniqueKey']>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ctor<T = any> = new (...args: any[]) => T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ACtor<T = any> = abstract new (...args: any[]) => T;

//
// class별로 식별 가능한 하나의 ID를 세팅하고 이를 활용할 수 있게 합니다
// 상속구조로 연결된 클래스도 구분할 수 있습니다.
//
// 기존 constructor.name을 사용하던 로직을 대체하기 위한 함수입니다
//
abstract class EmptyIdentifiableBase {
  private static [uniqueKey]: number;

  public static getUniqueKey(): number {
    if (Object.prototype.hasOwnProperty.call(this, uniqueKey)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this[uniqueKey]!;
    }
    this[uniqueKey] = uniqueKeyValue;
    uniqueKeyValue += 1;

    return this[uniqueKey];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Identifiable(): ACtor<any> & IIdentifiable;
function Identifiable<ABase extends ACtor>(
  base: ABase
): ACtor<InstanceType<typeof base>> & IIdentifiable;
function Identifiable<TBase extends Ctor>(
  base: TBase
): Ctor<InstanceType<typeof base>> & IIdentifiable;
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
function Identifiable(base?: any): any {
  if (base === undefined) {
    return EmptyIdentifiableBase;
  }
  abstract class IdentifiableBase extends base {
    private static [uniqueKey]: number;

    public static getUniqueKey(): number {
      if (Object.prototype.hasOwnProperty.call(this, uniqueKey)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this[uniqueKey]!;
      }
      this[uniqueKey] = uniqueKeyValue;
      uniqueKeyValue += 1;

      return this[uniqueKey];
    }
  }

  return IdentifiableBase;
}

export default Identifiable;
