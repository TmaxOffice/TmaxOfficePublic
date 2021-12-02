import { boundMethod } from 'autobind-decorator';
import { TreeNode } from 'office-core';

export default class TreeNodeWalker<NodeType extends TreeNode<NodeType>> {
  private targetNode?: NodeType;

  private markNode?: NodeType;

  private reverse: boolean;

  public constructor(point: NodeType, mark?: NodeType, reverse?: boolean) {
    this.targetNode = point; // start
    this.markNode = mark; // end
    this.reverse = reverse !== undefined ? reverse : false; // default false

    this.init();
  }

  @boundMethod
  private init(): void {
    // markNode(끝점)가 정의되어 있는 경우,
    // 역방향 순회일 때 markNode의 가장 첫번째 Child가 실질적 markNode(끝점)로 지정됨.
    // 순방향 순회일 때 makrNode의 가장 마지막 Child가 실질적 markNode(끝점)로 지정됨.
    if (this.markNode === undefined) {
      return;
    }

    if (this.reverse) {
      while (this.markNode?.getFirstChild() !== undefined) {
        this.markNode = this.markNode?.getFirstChild();
      }
    } else {
      while (this.markNode?.getLastChild() !== undefined) {
        this.markNode = this.markNode?.getLastChild();
      }
    }
  }

  @boundMethod
  public clear(): void {
    this.targetNode = undefined;
    this.markNode = undefined;
    this.reverse = false;
  }

  @boundMethod
  public next(): Nullable<NodeType> {
    if (this.targetNode === this.markNode) {
      this.targetNode = undefined;
      return undefined;
    }

    if (this.reverse) {
      this.targetNode = this.traverseReverse(this.targetNode as NodeType);
      return this.targetNode as NodeType;
    }

    this.targetNode = this.traverse(this.targetNode as NodeType);
    return this.targetNode as NodeType;
  }

  @boundMethod
  public skipChild(): Nullable<NodeType> {
    if (this.targetNode === this.markNode) {
      this.targetNode = undefined;
      return undefined;
    }

    const next = this.traverseNextSibling(this.targetNode as NodeType);
    this.targetNode = this.traverse(this.targetNode as NodeType);
    // child를 skip하면서 mark를 지나칠 수 있음
    while (this.targetNode) {
      if (next === this.targetNode) {
        break;
      }
      if (this.targetNode === this.markNode) {
        this.targetNode = undefined;
        break;
      }
      this.targetNode = this.traverse(this.targetNode as NodeType);
    }

    return this.targetNode as NodeType;
  }

  @boundMethod
  public getCurrent(): NodeType {
    return this.targetNode as NodeType;
  }

  @boundMethod
  private traverse(node: NodeType): Nullable<NodeType> {
    const firstChild = node.getFirstChild();

    if (firstChild) {
      return firstChild;
    }
    return this.traverseNextSibling(node);
  }

  @boundMethod
  private traverseNextSibling(node: NodeType): Nullable<NodeType> {
    const nextSibling = node.getNextSibling();
    const parentNode = node.getParent();

    if (nextSibling) {
      return nextSibling;
    }
    if (parentNode) {
      return this.traverseUp(parentNode);
    }
    return undefined;
  }

  // 순방향에서 부모 node로 조회.
  // 형제 node 없고, 부모 node 있는 경우 재귀
  @boundMethod
  private traverseUp(node: NodeType): Nullable<NodeType> {
    const nextSibling = node.getNextSibling();
    const parentNode = node.getParent();

    if (nextSibling) {
      return nextSibling;
    }
    if (parentNode) {
      return this.traverseUp(parentNode);
    }
    return undefined;
  }

  @boundMethod
  private traverseReverse(node: NodeType): Nullable<NodeType> {
    const lastChild = node.getLastChild();

    if (lastChild) {
      return lastChild;
    }
    return this.traversePrevSibling(node);
  }

  @boundMethod
  private traversePrevSibling(node: NodeType): Nullable<NodeType> {
    const prevSibling = node.getPrevSibling();
    const parentNode = node.getParent();

    if (prevSibling) {
      return prevSibling;
    }
    if (parentNode) {
      return this.traverseUpReverse(parentNode);
    }
    return undefined;
  }

  // 역방향에서 부모 node 조회.
  // 이전 형제 node 없고, 부모 node 있는 경우 재귀
  @boundMethod
  private traverseUpReverse(node: NodeType): Nullable<NodeType> {
    const prevSibling = node.getPrevSibling();
    const parentNode = node.getParent();

    if (prevSibling) {
      return prevSibling;
    }
    if (parentNode) {
      return this.traverseUpReverse(parentNode);
    }
    return undefined;
  }

  @boundMethod
  private traverseUpReverseAllData(node: NodeType): Nullable<NodeType> {
    let prevSibling = node.getPrevSibling();
    const parentNode = node.getParent();

    if (prevSibling === undefined) {
      return parentNode;
    }

    let lastChild = prevSibling.getLastChild();

    do {
      if (lastChild === undefined) {
        return prevSibling;
      }
      prevSibling = lastChild;
      lastChild = prevSibling.getLastChild();
    } while (lastChild);

    return prevSibling;
  }
}
