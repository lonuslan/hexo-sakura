title: daily leetcode - string-to-integer-atoi - !
date: '2020-01-29 18:43:16'
photos: https://img.hacpai.com/bing/20181023.jpg?imageView2/1/w/960/h/540/interlace/1/q/100
updated: '2020-01-29 18:54:03'
tags: [daily-leetcode]
permalink: /articles/2020/01/29/1580294596789.html
---
![](https://img.hacpai.com/bing/20181023.jpg?imageView2/1/w/960/h/540/interlace/1/q/100)

## 题目地址

https://leetcode.com/problems/string-to-integer-atoi/

## 题目描述

Implement `atoi` which converts a string to an integer.

The function first discards as many whitespace characters as necessary until the first non-whitespace character is found. Then, starting from this character, takes an optional initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.

The string can contain additional characters after those that form the integral number, which are ignored and have no effect on the behavior of this function.

If the first sequence of non-whitespace characters in str is not a valid integral number, or if no such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.

If no valid conversion could be performed, a zero value is returned.

Note:

* Only the space character `' '` is considered as whitespace character.
* Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. If the numerical value is out of the range of representable values, INT_MAX (231 − 1) or INT_MIN (−231) is returned.

Example 1:

```
Input: "42"
Output: 42

```

Example 2:

```
Input: "   -42"
Output: -42
Explanation: The first non-whitespace character is '-', which is the minus sign.
             Then take as many numerical digits as possible, which gets 42.

```

Example 3:

```
Input: "4193 with words"
Output: 4193
Explanation: Conversion stops at digit '3' as the next character is not a numerical digit.

```

Example 4:

```
Input: "words and 987"
Output: 0
Explanation: The first non-whitespace character is 'w', which is not a numerical 
             digit or a +/- sign. Therefore no valid conversion could be performed.

```

Example 5:

```
Input: "-91283472332"
Output: -2147483648
Explanation: The number "-91283472332" is out of the range of a 32-bit signed integer.
             Thefore INT_MIN (−231) is returned.
```

## 思路

字符串转为整数是很常用的一个函数，由于输入的是字符串，所以需要考虑的情况有很多种。博主之前有一篇文章是关于验证一个字符串是否为数字的，参见 [Valid Number](http://www.cnblogs.com/grandyang/p/4084408.html)。在那篇文章中，详细的讨论了各种情况，包括符号，自然数，小数点的出现位置，判断他们是否是数字。个人以为这道题也应该有这么多种情况。但是这题只需要考虑数字和符号的情况：

1. 若字符串开头是空格，则跳过所有空格，到第一个非空格字符，如果没有，则返回 0.
2. 若第一个非空格字符是符号 +/-，则标记 sign 的真假，这道题还有个局限性，那就是在 c++ 里面，+-1 和-+1 都是认可的，都是 -1，而在此题里，则会返回 0.
3. 若下一个字符不是数字，则返回 0，完全不考虑小数点和自然数的情况，不过这样也好，起码省事了不少。
4. 如果下一个字符是数字，则转为整形存下来，若接下来再有非数字出现，则返回目前的结果。
5. 还需要考虑边界问题，如果超过了整型数的范围，则用边界值替代当前值。

## 关键点解析

## 代码

C++ 解法：

```
class Solution {
public:
    int myAtoi(string str) {
        if (str.empty()) return 0;
        int sign = 1, base = 0, i = 0, n = str.size();
        while (i < n && str[i] == ' ') ++i;
        if (i < n && (str[i] == '+' || str[i] == '-')) {
            sign = (str[i++] == '+') ? 1 : -1;
        }
        while (i < n && str[i] >= '0' && str[i] <= '9') {
            if (base > INT_MAX / 10 || (base == INT_MAX / 10 && str[i] - '0' > 7)) {
                return (sign == 1) ? INT_MAX : INT_MIN;
            }
            base = 10 * base + (str[i++] - '0');
        }
        return base * sign;
    }
};

```

Java 解法：

```
public class Solution {
    public int myAtoi(String str) {
        if (str.isEmpty()) return 0;
        int sign = 1, base = 0, i = 0, n = str.length();
        while (i < n && str.charAt(i) == ' ') ++i;
        if (i < n && (str.charAt(i) == '+' || str.charAt(i) == '-')) {
            sign = (str.charAt(i++) == '+') ? 1 : -1;
        }
        while (i < n && str.charAt(i) >= '0' && str.charAt(i) <= '9') {
            if (base > Integer.MAX_VALUE / 10 || (base == Integer.MAX_VALUE / 10 && str.charAt(i) - '0' > 7)) {
                return (sign == 1) ? Integer.MAX_VALUE : Integer.MIN_VALUE;
            }
            base = 10 * base + (str.charAt(i++) - '0');
        }
        return base * sign;
    }
}
```

本文参考自：
[https://github.com/grandyang/leetcode/](https://github.com/grandyang/leetcode/)  &
[https://github.com/azl397985856/leetcode](https://github.com/azl397985856/leetcode)
