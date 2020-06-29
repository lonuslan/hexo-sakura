title: daily leetcode - integer-to-roman - !
date: '2020-01-30 11:59:50'
photos: https://img.hacpai.com/bing/20180711.jpg?imageView2/1/w/960/h/540/interlace/1/q/100
updated: '2020-01-30 12:09:37'
tags: [daily-leetcode]
permalink: /articles/2020/01/30/1580356790649.html
---
![](https://img.hacpai.com/bing/20180711.jpg?imageView2/1/w/960/h/540/interlace/1/q/100)

## 题目地址
https://leetcode.com/problems/integer-to-roman/
## 题目描述
Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

```
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

```

For example, two is written as `II` in Roman numeral, just two one's added together. Twelve is written as, `XII`, which is simply `X` + `II`. The number twenty seven is written as `XXVII`, which is `XX` + `V` + `II`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:

* `I` can be placed before `V` (5) and `X` (10) to make 4 and 9. 
* `X` can be placed before `L` (50) and `C` (100) to make 40 and 90. 
* `C` can be placed before `D` (500) and `M`(1000) to make 400 and 900.

Given an integer, convert it to a roman numeral. Input is guaranteed to be within the range from 1 to 3999.

Example 1:

```
Input: 3
Output: "III"

```

Example 2:

```
Input: 4
Output: "IV"

```

Example 3:

```
Input: 9
Output: "IX"

```

Example 4:

```
Input: 58
Output: "LVIII"
Explanation: L = 50, V = 5, III = 3.

```

Example 5:

```
Input: 1994
Output: "MCMXCIV"
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```
## 思路
之前那篇文章写的是罗马数字转化成整数 [Roman to Integer](http://www.cnblogs.com/grandyang/p/4120857.html)， 这次变成了整数转化成罗马数字，基本算法还是一样。由于题目中限定了输入数字的范围 (1 - 3999), 使得题目变得简单了不少。

I - 1

V - 5

X - 10

L - 50

C - 100 

D - 500

M - 1000

例如整数 1437 的罗马数字为 MCDXXXVII， 我们不难发现，千位，百位，十位和个位上的数分别用罗马数字表示了。 1000 - M, 400 - CD, 30 - XXX, 7 - VII。所以我们要做的就是用取商法分别提取各个位上的数字，然后分别表示出来：

100 - C

200 - CC

300 - CCC

400 - CD

500 - D

600 - DC

700 - DCC

800 - DCCC

900 - CM

可以分为四类，100 到 300 一类，400 一类，500 到 800 一类，900 最后一类。每一位上的情况都是类似的.
## 关键点解析

## 代码
解法一：

```
class Solution {
public:
    string intToRoman(int num) {
        string res = "";
        vector<char> roman{'M', 'D', 'C', 'L', 'X', 'V', 'I'};
        vector<int> value{1000, 500, 100, 50, 10, 5, 1};
        for (int n = 0; n < 7; n += 2) {
            int x = num / value[n];
            if (x < 4) {
                for (int i = 1; i <= x; ++i) res += roman[n];
            } else if (x == 4) {
                res = res + roman[n] + roman[n - 1]; 
            } else if (x > 4 && x < 9) {
                res += roman[n - 1];
                for (int i = 6; i <= x; ++i) res += roman[n];
            } else if (x == 9) {
                res = res + roman[n] + roman[n - 2];
            }
            num %= value[n];            
        }
        return res;
    }
};

```

 

本题由于限制了输入数字范围这一特殊性，故而还有一种利用贪婪算法的解法，建立一个数表，每次通过查表找出当前最大的数，减去再继续查表，参见代码如下：

 

解法二：

```
class Solution {
public:
    string intToRoman(int num) {
        string res = "";
        vector<int> val{1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        vector<string> str{"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
        for (int i = 0; i < val.size(); ++i) {
            while (num >= val[i]) {
                num -= val[i];
                res += str[i];
            }
        }
        return res;
    }
};

```

 

下面这种方法个人感觉属于比较投机取巧的方法，把所有的情况都列了出来，然后直接按位查表，O(1) 的时间复杂度啊，参见代码如下：

 

解法三：

```
class Solution {
public:
    string intToRoman(int num) {
        string res = "";
        vector<string> v1{"", "M", "MM", "MMM"};
        vector<string> v2{"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
        vector<string> v3{"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
        vector<string> v4{"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};
        return v1[num / 1000] + v2[(num % 1000) / 100] + v3[(num % 100) / 10] + v4[num % 10];
    }
};
```
本文参考自：
[https://github.com/grandyang/leetcode/](https://github.com/grandyang/leetcode/)  & 
[https://github.com/azl397985856/leetcode](https://github.com/azl397985856/leetcode)
