title: daily leetcode - zigzag-conversion - !
date: '2020-01-29 18:38:15'
photos: https://img.hacpai.com/bing/20191209.jpg?imageView2/1/w/960/h/540/interlace/1/q/100
updated: '2020-01-29 18:53:46'
tags: [daily-leetcode]
permalink: /articles/2020/01/29/1580294295142.html
---
![](https://img.hacpai.com/bing/20191209.jpg?imageView2/1/w/960/h/540/interlace/1/q/100)

## 题目地址

https://leetcode.com/problems/zigzag-conversion/

## 题目描述

The string `"PAYPALISHIRING"` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

```
P   A   H   N
A P L S I I G
Y   I   R

```

And then read line by line: `"PAHNAPLSIIGYIR"`

Write the code that will take a string and make this conversion given a number of rows:

```
string convert(string s, int numRows);

```

Example 1:

```
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"

```

Example 2:

```
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:

P     I    N
A   L S  I G
Y A   H R
P     I
```

## 思路

这道题刚开始看了半天没看懂是咋样变换的，上网查了些资料，终于搞懂了，就是要把字符串摆成一个之字型的，比如有一个字符串 "0123456789ABCDEF"，转为 zigzag 如下所示：

当 n = 2 时：

0 2 4 6 8 A C E

1 3 5 7 9 B D F

当 n = 3 时：

0   4    8     C

1 3 5 7 9 B D F

2    6   A     E

当 n = 4 时：

0     6        C

1   5 7   B  D

2 4   8 A    E

3      9       F

可以发现，除了第一行和最后一行没有中间形成之字型的数字外，其他都有，而首位两行中相邻两个元素的 index 之差跟行数是相关的，为  2*nRows - 2, 根据这个特点，可以按顺序找到所有的黑色元素在元字符串的位置，将他们按顺序加到新字符串里面。对于红色元素出现的位置（GitHub 上可能无法正常显示颜色，请参见[博客园上的帖子](https://www.cnblogs.com/grandyang/p/4128268.html)）也是有规律的，每个红色元素的位置为 j + 2 x numRows-2 - 2 x i, 其中，j 为前一个黑色元素的列数，i 为当前行数。 比如当 n = 4 中的那个红色 5，它的位置为 1 + 2 x 4-2 - 2 x 1 = 5，为原字符串的正确位置。知道了所有黑色元素和红色元素位置的正确算法，就可以一次性的把它们按顺序都加到新的字符串里面。

## 关键点解析

## 代码

解法一：

```
class Solution {
public:
    string convert(string s, int numRows) {
        if (numRows <= 1) return s;
        string res;
        int size = 2 * numRows - 2, n = s.size();
        for (int i = 0; i < numRows; ++i) {
            for (int j = i; j < n; j += size) {
                res += s[j];
                int pos = j + size - 2 * i;
                if (i != 0 && i != numRows - 1 && pos < n) res += s[pos];
            }
        }
        return res;
    }
};

```

若上面解法中的规律不是很好想的话，我们也可以用下面这种更直接的方法来做，建立一个大小为 numRows 的字符串数组，为的就是把之字形的数组整个存进去，然后再把每一行的字符拼接起来，就是想要的结果了。顺序就是按列进行遍历，首先前 numRows 个字符就是按顺序存在每行的第一个位置，然后就是 ‘之’ 字形的连接位置了，可以发现其实都是在行数区间 [1, numRows-2] 内，只要按顺序去取字符就可以了，最后把每行都拼接起来即为所求，参见代码如下：

解法二：

```
class Solution {
public:
    string convert(string s, int numRows) {
        if (numRows <= 1) return s;
        string res;
        int i = 0, n = s.size();
        vector<string> vec(numRows);
        while (i < n) {
            for (int pos = 0; pos < numRows && i < n; ++pos) {
                vec[pos] += s[i++];
            }
            for (int pos = numRows - 2; pos >= 1 && i < n; --pos) {
                vec[pos] += s[i++];
            }
        }
        for (auto &a : vec) res += a;
        return res;
    }
};
```

本文参考自：
[https://github.com/grandyang/leetcode/](https://github.com/grandyang/leetcode/)  &
[https://github.com/azl397985856/leetcode](https://github.com/azl397985856/leetcode)
