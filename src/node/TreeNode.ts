import { boundMethod } from 'autobind-decorator';
import { observable, action, makeObservable } from 'mobx';
import { NodeJson } from 'parser/TreeNodeParser';
import { serialize, serializable, identifier, alias, custom, SKIP } from 'serializr';

/**
 * Tree 와 관련된 로직이 구현된 abstract class입니다.
 * getter 메소드들의 반환 타입은 TreeNode를 상속할때 지정한 NodeType 타입입니다
 *
 * 이 클래스를 상속한 Node는 TreeNodeParser에서 파싱될 수 있습니다.
 * Abstract class 며, serialize 를 위해 getContentType() 을 override 해야 합니다.
 */
export default abstract class TreeNode<NodeType extends TreeNode<NodeType>> {
  /**
   * TreeNode<NodeType> 의 고유 ID 입니다.
   * 서버의 ID 와 일치해야 합니다.
   */
  @serializable(identifier(alias('elementId')))
  private id: number;

  /**
   * 부모 node 를 가리킵니다.
   * extend하는 클래스에서 타입을 지정해 주어야 합니다
   */
  private parent?: TreeNode<NodeType>;

  /**
   * 자식 node 중 첫번째를 가리킵니다.
   */
  @serializable(
    alias(
      'childId',
      custom(
        value => value?.getID() || 0 /* undefined */,
        value => SKIP
      )
    )
  )
  @observable.ref
  private firstChild?: TreeNode<NodeType>;

  /*
   * 자식 node 중 마지막을 가리킵니다.
   */
  @observable.ref
  private lastChild?: TreeNode<NodeType>;

  /**
   * 형제 node 중 다음을 가리킵니다.
   */
  @serializable(
    alias(
      'nextId',
      custom(
        value => value?.getID() || 0 /* undefined */,
        value => SKIP
      )
    )
  )
  @observable.ref
  private nextSibling?: TreeNode<NodeType>;

  /**
   * 형제 node 중 이전을 가리킵니다.
   */
  @observable.ref
  private prevSibling?: TreeNode<NodeType>;

  public constructor(id: number) {
    makeObservable(this);
    this.id = id;
    this.parent = undefined;
    this.firstChild = undefined;
    this.lastChild = undefined;
    this.nextSibling = undefined;
    this.prevSibling = undefined;
  }

  /**
   * 해당 node 의 ID 를 리턴합니다.
   * @returns 해당 node 의 ID
   */
  @boundMethod
  public getID(): number {
    return this.id;
  }

  /**
   * 해당 node 의 ID 를 세팅합니다
   * @returns 해당 node 의 ID
   */
  @boundMethod
  protected setID(id: number): void {
    this.id = id;
  }

  /**
   * 부모 node 를 리턴합니다.
   * @returns 부모 node
   */
  @boundMethod
  public getParent(): Nullable<NodeType> {
    return this.parent as NodeType;
  }

  /**
   * 자식 node 중 첫번째를 리턴합니다.
   * @returns 첫번째 자식 node
   */
  @boundMethod
  public getFirstChild(): Nullable<NodeType> {
    return this.firstChild as NodeType;
  }

  /**
   * 자식 node 중 마지막을 리턴합니다.
   * @returns 마지막 자식 node
   */
  @boundMethod
  public getLastChild(): Nullable<NodeType> {
    return this.lastChild as NodeType;
  }

  /**
   * 다음 형제 node 를 리턴합니다.
   * @returns 다음 형제 node
   */
  @boundMethod
  public getNextSibling(): Nullable<NodeType> {
    return this.nextSibling as NodeType;
  }

  /**
   * 이전 형제 node 를 리턴합니다.
   * @returns 이전 형제 node
   */
  @boundMethod
  public getPrevSibling(): Nullable<NodeType> {
    return this.prevSibling as NodeType;
  }

  /**
   * 부모 node 를 설정합니다.
   * @param parent 해당 node 의 부모
   */
  @boundMethod
  public setParent(parent?: NodeType | TreeNode<NodeType>): void {
    this.parent = parent;
  }

  /**
   * 첫번째 자식 node 를 설정합니다.
   * @param firstChild 해당 node 의 첫번째 자식
   */
  @action.bound
  public setFirstChild(firstChild?: NodeType | TreeNode<NodeType>): void {
    this.firstChild = firstChild;
  }

  /**
   * 마지막 자식 node 를 설정합니다.
   * @param lastChild 해당 node 의 마지막 자식
   */
  @action.bound
  public setLastChild(lastChild?: NodeType | TreeNode<NodeType>): void {
    this.lastChild = lastChild;
  }

  /**
   * 다음 형제 node 를 설정합니다.
   * @param nextSibling 해당 node 의 다음 형제
   */
  @action.bound
  public setNextSibling(nextSibling?: NodeType | TreeNode<NodeType>): void {
    this.nextSibling = nextSibling;
  }

  /**
   * 이전 형제 node 를 설정합니다.
   * @param prevSibling 해당 node 의 이전 형제
   */
  @action.bound
  public setPrevSibling(prevSibling?: NodeType | TreeNode<NodeType>): void {
    this.prevSibling = prevSibling;
  }

  /**
   * Child node 들을 loop 하면서 callback function 을 호출합니다.
   * Array 의 forEach() 와 유사한 동작을 합니다.
   * @param fn 각 child node 에 동작을 수행할 함수
   */
  @boundMethod
  public forEachChild(fn: (child: NodeType) => void): void {
    for (let it = this.firstChild; it !== undefined; it = it.nextSibling) {
      fn(it as NodeType);
    }
  }

  /**
   * Child node 들을 loop 하면서 callback function 을 호출해, 새로운 array 를 생성합니다.
   * Array 의 map() 와 유사한 동작을 합니다.
   * @param fn 각 child node 에 동작을 수행할 함수
   */
  @boundMethod
  public mapChild<T>(fn: (child: NodeType) => T): T[] {
    const ret = [] as T[];
    this.forEachChild(child => {
      ret.push(fn(child));
    });
    return ret;
  }

  /**
   * Child node 들을 loop 하면서 reducer function 을 호출해, 하나의 결과값을 반환합니다.
   * Array 의 reduce() 와 유사한 동작을 합니다.
   * @param fn 각 child node 에 연산을 수행할 리듀서 함수로, (누적값, child node) => 새로운 값 형태의 순수 함수가 되어야 합니다.
   * @param initialValue 리듀서 함수의 accumulator 에 들어갈 최초 값을 지정합니다.
   * @returns reducer 를 통해 연산된 결과값
   */
  @boundMethod
  public reduceChild<T>(fn: (accumulator: T, child: NodeType) => T, initalValue: T): T {
    let ret = initalValue;
    this.forEachChild(child => {
      ret = fn(ret, child);
    });
    return ret;
  }

  /**
   * 해당 node 를 부모에 붙여줍니다. 부모 node 의 마지막 child 로 붙습니다.
   * 특정 위치에 붙이고 싶으면 nextNode 인자를 사용해야 합니다.
   * @param parentNode 해당 node 의 부모가 될 node
   * @param nextNode 해당 node 의 다음 형제가 될 node
   */
  @boundMethod
  public append(parentNode: NodeType | TreeNode<NodeType>, nextNode?: NodeType): void {
    if (nextNode !== undefined) {
      (parentNode as TreeNode<NodeType>).appendChildBefore(this, nextNode);
    } else {
      (parentNode as TreeNode<NodeType>).appendChild(this);
    }
  }

  /**
   * 해당 node 를 부모에서 제거해줍니다.
   * @param parentNode 해당 node 로부터 떼어질 부모 node
   */
  @boundMethod
  public remove(parentNode: NodeType | TreeNode<NodeType>): void {
    parentNode.removeChild(this);
  }

  // /**
  //  * 해당 node 를 JSON 타입으로 변경합니다.
  //  * @returns 해당 node 의 JSON object
  //  */
  // // TODO: 이름 변경해야 할 수 있음
  // public abstract serialize(): NodeJson;

  // /**
  //  * 해당 node 를 포함해 자식 node 들을 JSON 타입으로 변경합니다.
  //  * Element 와 Document model 의 subtree serialize 방식이 다릅니다.
  //  * Element 는 자신을 포함하여 serialize 하며, document 는 포함하지 않습니다.
  //  * @returns JSON object array 형태의 자식 node 들
  //  */
  // public abstract serializeSubTree(): NodeJson[];

  /**
   * 해당 node 를 마지막 child 로 붙입니다.
   * @param newChild 해당 node 의 자식으로 붙을 node
   */
  @action
  protected appendChild(newChild: NodeType | TreeNode<NodeType>): void {
    newChild.setParent(this);
    if (this.firstChild === undefined) {
      this.firstChild = newChild;
      this.lastChild = newChild;
      newChild.setPrevSibling(undefined);
      newChild.setNextSibling(undefined);
    } else {
      this.lastChild?.setNextSibling(newChild);
      newChild.setPrevSibling(this.lastChild);
      newChild.setNextSibling(undefined);
      this.lastChild = newChild;
    }
  }

  /**
   * 해당 node 를 특정 자식 node 이전에 붙입니다.
   * @param newChild 해당 node 의 자식으로 붙을 node
   * @param refChild 자식으로 붙을 node 다음의 node
   */
  @action
  protected appendChildBefore(newChild: NodeType | TreeNode<NodeType>, refChild: NodeType): void {
    newChild.setParent(refChild.getParent());
    if (refChild === this.firstChild) {
      this.firstChild = newChild;
      newChild.setPrevSibling(undefined);
    } else {
      newChild.setPrevSibling(refChild.getPrevSibling());
      refChild.getPrevSibling()?.setNextSibling(newChild);
    }
    newChild.setNextSibling(refChild);
    refChild.setPrevSibling(newChild);
  }

  /**
   * 해당 node 를 child 에서 제거합니다.
   * @param child 해당 node 로부터 제거될 자식 node
   */
  @action.bound
  private removeChild(child: NodeType | TreeNode<NodeType>): void {
    if (this.firstChild === child) {
      if (this.lastChild === child) {
        // Only one
        this.firstChild = undefined;
        this.lastChild = undefined;
      } else {
        // First
        this.firstChild = child.getNextSibling();
        this.firstChild?.setPrevSibling(undefined);
      }
    } else if (this.lastChild === child) {
      // Last
      this.lastChild = child.getPrevSibling();
      this.lastChild?.setNextSibling(undefined);
    } else {
      // Middle
      child.getPrevSibling()?.setNextSibling(child.getNextSibling());
      child.getNextSibling()?.setPrevSibling(child.getPrevSibling());
    }
  }

  public getContentJsonString(): string {
    return '';
  }

  // for debug
  @boundMethod
  public dPrintTree(): void {
    console.log('=========================== Print Model Tree ===========================');
    this.dPrintTreeInternal(0, this as TreeNode<NodeType>);
    console.log('========================================================================');
  }

  @boundMethod
  public dPrintTreeInternal(depth: number, caller: TreeNode<NodeType>): void {
    let tabDepth = depth;
    let logString = '--';
    for (; tabDepth > 0; tabDepth -= 1) {
      logString += '--';
    }

    logString += ` ${this.constructor.name} [ID: ${this.getID()}]`;

    if (this === caller) {
      logString += ' ===== this is caller !! =====';
    }

    console.log(logString);

    this.forEachChild(child => {
      child.dPrintTreeInternal(depth + 1, caller);
    });
  }

  @boundMethod
  public serialize(): NodeJson {
    const json = serialize(this);
    return {
      ...json,
      contentType: this.getContentType(),
    };
  }

  @boundMethod
  public serializeSubTree(): NodeJson[] {
    return this.reduceChild((accumulator, child) => {
      const ret = [...accumulator, this.serialize()];
      ret.push(...child.serializeSubTree());
      return ret;
    }, [] as NodeJson[]);
  }

  /**
   * Serialize 간 'contentType' 에 에 기록해야 할 정보를 리턴합니다.
   * @returns 'contentType; 에 해당하는 value
   */
  public abstract getContentType(): string;
}
