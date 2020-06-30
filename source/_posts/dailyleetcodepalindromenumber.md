title: daily leetcode - palindrome-number - !
date: '2020-01-29 18:46:20'
photos: https://img.hacpai.com/bing/20191113.jpg?imageView2/1/w/960/h/540/interlace/1/q/100
updated: '2020-01-29 18:54:11'
tags: [daily-leetcode]
permalink: /articles/2020/01/29/1580294780003.html
---
![](https://img.hacpai.com/bing/20191113.jpg?imageView2/1/w/960/h/540/interlace/1/q/100)

## 题目地址

https://leetcode.com/problems/palindrome-number/

## 题目描述

Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

Example 1:

```
Input: 121
Output: true

```

Example 2:

```
Input: -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

```

Example 3:

```
Input: 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

```

Follow up:

Coud you solve it without converting the integer to a string?

## 思路

这道验证回文数字的题如果将数字转为字符串，就变成了验证回文字符串的题，没啥难度了，我们就直接来做 follow up 吧，不能转为字符串，而是直接对整数进行操作，可以利用取整和取余来获得想要的数字，比如 1221 这个数字，如果 计算 1221 / 1000， 则可得首位 1， 如果 1221 % 10， 则可得到末尾 1，进行比较，然后把中间的 22 取出继续比较。

## 关键点解析

## 代码

解法一：

```
class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0) return false;
        int div = 1;
        while (x / div >= 10) div *= 10;
        while (x > 0) {
            int left = x / div;
            int right = x % 10;
            if (left != right) return false;
            x = (x % div) / 10;
            div /= 100;
        }
        return true;
    }
};

```

再来看一种很巧妙的解法，还是首先判断 x 是否为负数，这里可以用一个小 trick，因为整数的最高位不能是 0，所以回文数的最低位也不能为 0，数字 0 除外，所以如果发现某个正数的末尾是 0 了，也直接返回 false 即可。好，下面来看具体解法，要验证回文数，那么就需要看前后半段是否对称，如果把后半段翻转一下，就看和前半段是否相等就行了。所以做法就是取出后半段数字，进行翻转，具体做法是，每次通过对 10 取余，取出最低位的数字，然后加到取出数的末尾，就是将 revertNum 乘以 10，再加上这个余数，这样翻转也就同时完成了，每取一个最低位数字，x 都要自除以 10。这样当 revertNum 大于等于 x 的时候循环停止。由于回文数的位数可奇可偶，如果是偶数的话，那么 revertNum 就应该和 x 相等了；如果是奇数的话，那么最中间的数字就在 revertNum 的最低位上了，除以 10 以后应该和 x 是相等的，参见代码如下：

解法二：

```
class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        int revertNum = 0;
        while (x > revertNum) {
            revertNum = revertNum * 10 + x % 10;
            x /= 10;
        }
        return x == revertNum || x == revertNum / 10;
    }
};

```

下面这种解法由热心网友 [zeeng](https://www.cnblogs.com/grandyang/p/4125510.html#3951921) 提供，如果是 palindrome，反转后仍是原数字，就不可能溢出，只要溢出一定不是 palindrome 返回 false 就行。可以参考 [Reverse Integer](http://www.cnblogs.com/grandyang/p/4125588.html) 这题，直接调用 Reverse()。

解法三：

```
class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        return reverse(x) == x;
    }
    int reverse(int x) {
        int res = 0;
        while (x != 0) {
            if (res > INT_MAX / 10) return -1;
            res = res * 10 + x % 10;
            x /= 10;
        }
        return res;
    }
};
```

本文参考自：
[https://github.com/grandyang/leetcode/](https://github.com/grandyang/leetcode/)  &
[https://github.com/azl397985856/leetcode](https://github.com/azl397985856/leetcode)
