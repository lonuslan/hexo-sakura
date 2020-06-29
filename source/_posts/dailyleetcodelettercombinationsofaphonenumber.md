title: daily leetcode - letter-combinations-of-a-phone-number - !
date: '2020-01-31 10:14:25'
photos: https://img.hacpai.com/bing/20171104.jpg?imageView2/1/w/960/h/540/interlace/1/q/100
updated: '2020-01-31 11:01:40'
tags: [daily-leetcode]
permalink: /articles/2020/01/31/1580436865269.html
---
![](https://img.hacpai.com/bing/20171104.jpg?imageView2/1/w/960/h/540/interlace/1/q/100)

## 题目地址

https://leetcode.com/problems/letter-combinations-of-a-phone-number/

## 题目描述

Given a string containing digits from `2-9`inclusive, return all possible letter combinations that the number could represent.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

![mark](https://img.lonuslan.com/lonuslan/20200131/w98Vk6HC9M3x.png)

Example:

```
Input: "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].

```

Note:

Although the above answer is in lexicographical order, your answer could be in any order you want.

## 思路

这道题让我们求电话号码的字母组合，即数字 2 到 9 中每个数字可以代表若干个字母，然后给一串数字，求出所有可能的组合，相类似的题目有 [Path Sum II](http://www.cnblogs.com/grandyang/p/4042156.html)，[Subsets II](http://www.cnblogs.com/grandyang/p/4310964.html)，[Permutations](http://www.cnblogs.com/grandyang/p/4358848.html)，[Permutations II](http://www.cnblogs.com/grandyang/p/4359825.html)，[Combinations](http://www.cnblogs.com/grandyang/p/4332522.html)，[Combination Sum](http://www.cnblogs.com/grandyang/p/4419259.html) 和 [Combination Sum II](http://www.cnblogs.com/grandyang/p/4419386.html) 等等。这里可以用递归 Recursion 来解，需要建立一个字典，用来保存每个数字所代表的字符串，然后还需要一个变量 level，记录当前生成的字符串的字符个数，实现套路和上述那些题十分类似。在递归函数中首先判断 level，如果跟 digits 中数字的个数相等了，将当前的组合加入结果 res 中，然后返回。我们通过 digits 中的数字到 dict 中取出字符串，然后遍历这个取出的字符串，将每个字符都加到当前的组合后面，并调用递归函数即可。

## 关键点解析

## 代码

解法一：

```
class Solution {
public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {};
        vector<string> res;
        vector<string> dict{"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        letterCombinationsDFS(digits, dict, 0, "", res);
        return res;
    }
    void letterCombinationsDFS(string& digits, vector<string>& dict, int level, string out, vector<string>& res) {
        if (level == digits.size()) {res.push_back(out); return;}
        string str = dict[digits[level] - '0'];
        for (int i = 0; i < str.size(); ++i) {
            letterCombinationsDFS(digits, dict, level + 1, out + str[i], res);
        }
    }
}; 

```

这道题也可以用迭代 Iterative 来解，在遍历 digits 中所有的数字时，先建立一个临时的字符串数组 t，然后跟上面解法的操作一样，通过数字到 dict 中取出字符串 str，然后遍历取出字符串中的所有字符，再遍历当前结果 res 中的每一个字符串，将字符加到后面，并加入到临时字符串数组 t 中。取出的字符串 str 遍历完成后，将临时字符串数组赋值给结果 res，具体实现参见代码如下：

解法二：

```
class Solution {
public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {};
        vector<string> res{""};
        vector<string> dict{"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        for (int i = 0; i < digits.size(); ++i) {
            vector<string> t;
            string str = dict[digits[i] - '0'];
            for (int j = 0; j < str.size(); ++j) {
                for (string s : res) t.push_back(s + str[j]);
            }
            res = t;
        }
        return res;
    }
};
```

本文参考自：
[https://github.com/grandyang/leetcode/](https://github.com/grandyang/leetcode/)  &
[https://github.com/azl397985856/leetcode](https://github.com/azl397985856/leetcode)
