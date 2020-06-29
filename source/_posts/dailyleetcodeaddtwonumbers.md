title: daily leetcode - add-two-numbers - !
date: '2020-01-28 18:19:01'
photos: https://img.hacpai.com/bing/20190209.jpg?imageView2/1/w/960/h/540/interlace/1/q/100
updated: '2020-01-28 18:19:01'
tags: [daily-leetcode]
permalink: /articles/2020/01/28/1580206741433.html
---
![](https://img.hacpai.com/bing/20190209.jpg?imageView2/1/w/960/h/540/interlace/1/q/100)

## 题目地址
https://leetcode.com/problems/add-two-numbers/
## 题目描述
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example:

```
Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
```
## 思路
这道并不是什么难题，算法很简单，链表的数据类型也不难，就是建立一个新链表，然后把输入的两个链表从头往后撸，每两个相加，添加一个新节点到新链表后面。为了避免两个输入链表同时为空，我们建立一个 dummy 结点，将两个结点相加生成的新结点按顺序加到 dummy 结点之后，由于 dummy 结点本身不能变，所以用一个指针 cur 来指向新链表的最后一个结点。好，可以开始让两个链表相加了，这道题好就好在最低位在链表的开头，所以可以在遍历链表的同时按从低到高的顺序直接相加。while 循环的条件两个链表中只要有一个不为空行，由于链表可能为空，所以在取当前结点值的时候，先判断一下，若为空则取0，否则取结点值。然后把两个结点值相加，同时还要加上进位 carry。然后更新 carry，直接 sum/10 即可，然后以 sum%10 为值建立一个新结点，连到 cur 后面，然后 cur 移动到下一个结点。之后再更新两个结点，若存在，则指向下一个位置。while 循环退出之后，最高位的进位问题要最后特殊处理一下，若 carry 为1，则再建一个值为1的结点。
### 思路2
设立一个表示进位的变量carried，建立一个新链表，
把输入的两个链表从头往后同时处理，每两个相加，将结果加上carried后的值作为一个新节点到新链表后面。

![mark](https://img.lonuslan.com/lonuslan/20200128/JG3nIv2eOtUt.gif)

(图片来自： https://github.com/MisterBooo/LeetCodeAnimation)
## 关键点解析
1. 链表这种数据结构的特点和使用

2. 用一个carried变量来实现进位的功能，每次相加之后计算carried，并用于下一位的计算

## 代码
C++ 解法：   

```  
class Solution {  
public:  
 ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {  
 ListNode *dummy = new ListNode(-1), *cur = dummy;  
 int carry = 0;  
 while (l1 || l2) {  
 int val1 = l1 ? l1->val : 0;  
 int val2 = l2 ? l2->val : 0;  
 int sum = val1 + val2 + carry;  
 carry = sum / 10;  
 cur->next = new ListNode(sum % 10);  
 cur = cur->next;  
 if (l1) l1 = l1->next;  
 if (l2) l2 = l2->next;  
 }  
 if (carry) cur->next = new ListNode(1);  
 return dummy->next;  
 }  
};  
  
```

​    

Java 解法：  

```  
public class Solution {  
 public ListNode addTwoNumbers(ListNode l1, ListNode l2) {  
 ListNode dummy = new ListNode(-1);  
 ListNode cur = dummy;  
 int carry = 0;  
 while (l1 != null || l2 != null) {  
 int d1 = l1 == null ? 0 : l1.val;  
 int d2 = l2 == null ? 0 : l2.val;  
 int sum = d1 + d2 + carry;  
 carry = sum >= 10 ? 1 : 0;  
 cur.next = new ListNode(sum % 10);  
 cur = cur.next;  
 if (l1 != null) l1 = l1.next;  
 if (l2 != null) l2 = l2.next;  
 }  
 if (carry == 1) cur.next = new ListNode(1);  
 return dummy.next;  
 }  
}  
```

### 代码2
* 语言支持：JS，C++

JavaScript:
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  if (l1 === null || l2 === null) return null

  // 使用dummyHead可以简化对链表的处理，dummyHead.next指向新链表
  let dummyHead = new ListNode(0)
  let cur1 = l1
  let cur2 = l2
  let cur = dummyHead // cur用于计算新链表
  let carry = 0 // 进位标志

  while (cur1 !== null || cur2 !== null) {
    let val1 = cur1 !== null ? cur1.val : 0
    let val2 = cur2 !== null ? cur2.val : 0
    let sum = val1 + val2 + carry
    let newNode = new ListNode(sum % 10) // sum%10取模结果范围为0~9，即为当前节点的值
    carry = sum >= 10 ? 1 : 0 // sum>=10，carry=1，表示有进位
    cur.next = newNode
    cur = cur.next

    if (cur1 !== null) {
      cur1 = cur1.next
    }

    if (cur2 !== null) {
      cur2 = cur2.next
    }
  }

  if (carry > 0) {
    // 如果最后还有进位，新加一个节点
    cur.next = new ListNode(carry)
  }

  return dummyHead.next
};
```
C++
> C++代码与上面的JavaScript代码略有不同：将carry是否为0的判断放到了while循环中
```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* ret = nullptr;
        ListNode* cur = nullptr;
        int carry = 0;
        while (l1 != nullptr || l2 != nullptr || carry != 0) {
            carry += (l1 == nullptr ? 0 : l1->val) + (l2 == nullptr ? 0 : l2->val);
            auto temp = new ListNode(carry % 10);
            carry /= 10;
            if (ret == nullptr) {
                ret = temp;
                cur = ret;
            }
            else {
                cur->next = temp;
                cur = cur->next;
            }
            l1 = l1 == nullptr ? nullptr : l1->next;
            l2 = l2 == nullptr ? nullptr : l2->next;
        }
        return ret;
    }
};
```
### 拓展

通过单链表的定义可以得知，单链表也是递归结构，因此，也可以使用递归的方式来进行reverse操作。
> 由于单链表是线性的，使用递归方式将导致栈的使用也是线性的，当链表长度达到一定程度时，递归会导致爆栈，因此，现实中并不推荐使用递归方式来操作链表。

#### 描述

1. 将两个链表的第一个节点值相加，结果转为0-10之间的个位数，并设置进位信息
2. 将两个链表第一个节点以后的链表做带进位的递归相加
3. 将第一步得到的头节点的next指向第二步返回的链表

####  C++实现
```C++
// 普通递归
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        return addTwoNumbers(l1, l2, 0);
    }
    
private:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2, int carry) {
        if (l1 == nullptr && l2 == nullptr && carry == 0) return nullptr;
        carry += (l1 == nullptr ? 0 : l1->val) + (l2 == nullptr ? 0 : l2->val);
        auto ret = new ListNode(carry % 10);
        ret->next = addTwoNumbers(l1 == nullptr ? l1 : l1->next,
                                 l2 == nullptr ? l2 : l2->next,
                                 carry / 10);
        return ret;
    }
};
// （类似）尾递归
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* head = nullptr;
        addTwoNumbers(head, nullptr, l1, l2, 0);
        return head;
    }
    
private:
    void addTwoNumbers(ListNode*& head, ListNode* cur, ListNode* l1, ListNode* l2, int carry) {
        if (l1 == nullptr && l2 == nullptr && carry == 0) return;
        carry += (l1 == nullptr ? 0 : l1->val) + (l2 == nullptr ? 0 : l2->val);
        auto temp = new ListNode(carry % 10);
        if (cur == nullptr) {
            head = temp;
            cur = head;
        } else {
            cur->next = temp;
            cur = cur->next;
        }
        addTwoNumbers(head, cur, l1 == nullptr ? l1 : l1->next, l2 == nullptr ? l2 : l2->next, carry / 10);
    }
};
```

本文参考自：
[https://github.com/grandyang/leetcode/](https://github.com/grandyang/leetcode/)  & 
[https://github.com/azl397985856/leetcode](https://github.com/azl397985856/leetcode)
