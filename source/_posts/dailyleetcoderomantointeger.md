title: daily leetcode - roman-to-integer - !
date: '2020-01-30 12:02:41'
photos: https://img.hacpai.com/bing/20190111.jpg?imageView2/1/w/960/h/540/interlace/1/q/100
updated: '2020-01-30 12:09:44'
tags: [daily-leetcode]
permalink: /articles/2020/01/30/1580356960946.html
---
![](https://img.hacpai.com/bing/20190111.jpg?imageView2/1/w/960/h/540/interlace/1/q/100)

## 题目地址
https://leetcode.com/problems/roman-to-integer/
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

For example, two is written as `II` in Roman numeral, just two one's added together. Twelve is written as, `XII`, which is simply `X`+ `II`. The number twenty seven is written as `XXVII`, which is `XX` + `V` + `II`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:

* `I` can be placed before `V` (5) and `X`(10) to make 4 and 9. 
* `X` can be placed before `L` (50) and `C` (100) to make 40 and 90. 
* `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999.

Example 1:

```
Input: "III"
Output: 3

```

Example 2:

```
Input: "IV"
Output: 4

```

Example 3:

```
Input: "IX"
Output: 9

```

Example 4:

```
Input: "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.

```

Example 5:

```
Input: "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```
## 思路
**[罗马数](http://zh.wikipedia.org/wiki/%E7%BD%97%E9%A9%AC%E6%95%B0%E5%AD%97)** 转化成数字问题，我们需要对于 **[罗马数字](http://baike.baidu.com/view/42061.htm?fr=aladdin)** 很熟悉才能完成转换。以下截自百度百科：

[**罗马**](http://baike.baidu.com/view/2245.htm) **数字是最早的数字表示方式，比阿拉伯数字早2000多年，起源于罗马。**

如今我们最常见的罗马数字就是钟表的表盘符号： **Ⅰ，Ⅱ，Ⅲ，Ⅳ（IIII），Ⅴ，Ⅵ，Ⅶ，Ⅷ，Ⅸ，Ⅹ，Ⅺ，Ⅻ……**

对应阿拉伯数字（就是现在国际通用的数字），就是1，2，3，4，5，6，7，8，9，10，11，12。（注： **阿拉伯数字** 其实是古代[印度](http://baike.baidu.com/view/2174.htm)人发明的，后来由阿拉伯人传入[欧洲](http://baike.baidu.com/view/3622.htm)，被欧洲人误称为阿拉伯数字。）

I - 1

V - 5

X - 10

L - 50

C - 100 

D - 500

M - 1000

1、相同的数字连写，所表示的数等于这些数字相加得到的数，如：Ⅲ = 3；

2、小的数字在大的数字的右边，所表示的数等于这些数字相加得到的数， 如：Ⅷ = 8；Ⅻ = 12；

3、小的数字，（限于Ⅰ、X 和C）在大的数字的左边，所表示的数等于大数减小数得到的数，如：Ⅳ= 4；Ⅸ= 9；

4、正常使用时，连写的数字重复不得超过三次。（表盘上的四点钟“IIII”例外）

5、在一个数的上面画一条横线，表示这个数扩大1000倍。

 

**有几条须注意掌握：**

1、基本数字Ⅰ、X 、C 中的任何一个，自身连用构成数目，或者放在大数的右边连用构成数目，都不能超过三个；放在大数的左边只能用一个。

2、不能把基本数字V 、L 、D 中的任何一个作为小数放在大数的左边采用相减的方法构成数目；放在大数的右边采用相加的方式构成数目，只能使用一个。

3、V 和X 左边的小数字只能用Ⅰ。

4、L 和C 左边的小数字只能用X。

5、D 和M 左边的小数字只能用C。

 

而这道题好就好在没有让我们来验证输入字符串是不是罗马数字，这样省掉不少功夫。需要用到 HashMap 数据结构，来将罗马数字的字母转化为对应的整数值，因为输入的一定是罗马数字，那么只要考虑两种情况即可：

第一，如果当前数字是最后一个数字，或者之后的数字比它小的话，则加上当前数字。

第二，其他情况则减去这个数字。
## 关键点解析

## 代码
解法一：

```
class Solution {
public:
    int romanToInt(string s) {
        int res = 0;
        unordered_map<char, int> m{{'I', 1}, {'V', 5}, {'X', 10}, {'L', 50}, {'C', 100}, {'D', 500}, {'M', 1000}};
        for (int i = 0; i < s.size(); ++i) {
            int val = m[s[i]];
            if (i == s.size() - 1 || m[s[i+1]] <= m[s[i]]) res += val;
            else res -= val;
        }
        return res;
    }
};

```

 

我们也可以每次跟前面的数字比较，如果小于等于前面的数字，先加上当前的数字，比如 "VI"，第二个字母 'I' 小于第一个字母 'V'，所以要加1。如果大于的前面的数字，加上当前的数字减去二倍前面的数字，这样可以把在上一个循环多加数减掉，比如 "IX"，我们在 i=0 时，加上了第一个字母 'I' 的值，此时结果 res 为1。当 i=1 时，字母 'X' 大于前一个字母 'I'，这说明前面的1是要减去的，而由于前一步不但没减，还多加了个1，所以此时要减去2倍的1，就是减2，所以才能得到9，整个过程是 res = 1 + 10 - 2 = 9，参见代码如下:

 

解法二：

```
class Solution {
public:
    int romanToInt(string s) {
        int res = 0;
        unordered_map<char, int> m{{'I', 1}, {'V', 5}, {'X', 10}, {'L', 50}, {'C', 100}, {'D', 500}, {'M', 1000}};
        for (int i = 0; i < s.size(); ++i) {
            if (i == 0 || m[s[i]] <= m[s[i - 1]]) res += m[s[i]];
            else res += m[s[i]] - 2 * m[s[i - 1]];
        }
        return res;
    }
};
```
本文参考自：
[https://github.com/grandyang/leetcode/](https://github.com/grandyang/leetcode/)  & 
[https://github.com/azl397985856/leetcode](https://github.com/azl397985856/leetcode)
