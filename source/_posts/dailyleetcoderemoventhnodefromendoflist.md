title: daily leetcode - remove-nth-node-from-end-of-list - !
date: '2020-01-31 10:24:17'
photos: https://img.hacpai.com/bing/20191227.jpg?imageView2/1/w/960/h/540/interlace/1/q/100
updated: '2020-01-31 11:01:57'
tags: [daily-leetcode]
permalink: /articles/2020/01/31/1580437457776.html
---
![](https://img.hacpai.com/bing/20191227.jpg?imageView2/1/w/960/h/540/interlace/1/q/100)

## 题目地址

https://leetcode.com/problems/remove-nth-node-from-end-of-list/

## 题目描述

Given a linked list, remove the *n* th node from the end of list and return its head.

For example,

```
   Given linked list: **1- >2->3->4->5**, and **_n_ = 2**.

   After removing the second node from the end, the linked list becomes **1- >2->3->5**.

```

**Note:**
Given *n* will always be valid.
Try to do this in one pass.

**Follow up:**
Could you do this in one pass?

## 思路

这道题让我们移除链表倒数第 N 个节点，限定 n 一定是有效的，即 n 不会大于链表中的元素总数。还有题目要求一次遍历解决问题，那么就得想些比较巧妙的方法了。比如首先要考虑的时，如何找到倒数第 N 个节点，由于只允许一次遍历，所以不能用一次完整的遍历来统计链表中元素的个数，而是遍历到对应位置就应该移除了。那么就需要用两个指针来帮助解题，pre 和 cur 指针。首先 cur 指针先向前走 N 步，如果此时 cur 指向空，说明 N 为链表的长度，则需要移除的为首元素，那么此时返回 head->next 即可，如果 cur 存在，再继续往下走，此时 pre 指针也跟着走，直到 cur 为最后一个元素时停止，此时 pre 指向要移除元素的前一个元素，再修改指针跳过需要移除的元素即可。

### 思路 2

双指针，指针 A 先移动 n 次， 指针 B 再开始移动。当 A 到达 null 的时候， 指针 b 的位置正好是倒数 n

我们可以设想假设设定了双指针 p 和 q 的话，当 q 指向末尾的 NULL，p 与 q 之间相隔的元素个数为 n 时，那么删除掉 p 的下一个指针就完成了要求。

设置虚拟节点 dummyHead 指向 head

设定双指针 p 和 q，初始都指向虚拟节点 dummyHead

移动 q，直到 p 与 q 之间相隔的元素个数为 n

同时移动 p 与 q，直到 q 指向的为 NULL

将 p 的下一个节点指向下下个节点

![mark](https://img.lonuslan.com/lonuslan/20200131/wiDcUf5qhVti.gif)

(图片来自： https://github.com/MisterBooo/LeetCodeAnimation)

## 关键点解析

1. 链表这种数据结构的特点和使用
2. 使用双指针
3. 使用一个 dummyHead 简化操作

## 代码

```
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        if (!head->next) return NULL;
        ListNode *pre = head, *cur = head;
        for (int i = 0; i < n; ++i) cur = cur->next;
        if (!cur) return head->next;
        while (cur->next) {
            cur = cur->next;
            pre = pre->next;
        }
        pre->next = pre->next->next;
        return head;
    }
};
```

### 代码 2

Support: JS, Java

- JavaScript Implementation

```js
/*
 * @lc app=leetcode id=19 lang=javascript
 *
 * [19] Remove Nth Node From End of List
 *
 * https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/
 *
 * algorithms
 * Medium (34.03%)
 * Total Accepted:    360.1K
 * Total Submissions: 1.1M
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * Given a linked list, remove the n-th node from the end of list and return
 * its head.
 * 
 * Example:
 * 
 * 
 * Given linked list: 1->2->3->4->5, and n = 2.
 * 
 * After removing the second node from the end, the linked list becomes
 * 1->2->3->5.
 * 
 * 
 * Note:
 * 
 * Given n will always be valid.
 * 
 * Follow up:
 * 
 * Could you do this in one pass?
 * 
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let i = -1;
  const noop = {
    next: null
  };

  const dummyHead = new ListNode(); // 增加一个dummyHead 简化操作
  dummyHead.next = head;

  let currentP1 = dummyHead;
  let currentP2 = dummyHead;

  
  while (currentP1) {

    if (i === n) {
      currentP2 = currentP2.next;
    }

    if (i !== n) {
        i++;
    }
    
    currentP1 = currentP1.next;
  }

  currentP2.next = ((currentP2 || noop).next || noop).next;

  return dummyHead.next;
};

```

- Java Code

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        TreeNode dummy = new TreeNode(0);
        dummy.next = head;
        TreeNode first = dummy;
        TreeNode second = dummy;

        if (int i=0; i<=n; i++) {
            first = first.next;
        }

        while (first != null) {
            first = first.next;
            second = second.next;
        }

        second.next = second.next.next;

        return dummy.next;
    }
}
```

本文参考自：
[https://github.com/grandyang/leetcode/](https://github.com/grandyang/leetcode/)  &
[https://github.com/azl397985856/leetcode](https://github.com/azl397985856/leetcode)
