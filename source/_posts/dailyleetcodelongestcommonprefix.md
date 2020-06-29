title: daily leetcode - longest-common-prefix - !
date: '2020-01-30 12:04:30'
photos: https://img.hacpai.com/bing/20180725.jpg?imageView2/1/w/960/h/540/interlace/1/q/100
updated: '2020-01-30 12:09:51'
tags: [daily-leetcode]
permalink: /articles/2020/01/30/1580357070108.html
---
![](https://img.hacpai.com/bing/20180725.jpg?imageView2/1/w/960/h/540/interlace/1/q/100)

## 题目地址
https://leetcode.com/problems/longest-common-prefix/
## 题目描述
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string `""`.

Example 1:

```
Input: ["flower","flow","flight"]
Output: "fl"

```

Example 2:

```
Input: ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.

```

Note:

All given inputs are in lowercase letters `a-z`.
## 思路
这道题让我们求一系列字符串的共同前缀，没有什么特别的技巧，无脑查找即可，定义两个变量i和j，其中i是遍历搜索字符串中的字符，j是遍历字符串集中的每个字符串。这里将单词上下排好，则相当于一个各行长度有可能不相等的二维数组，遍历顺序和一般的横向逐行遍历不同，而是采用纵向逐列遍历，在遍历的过程中，如果某一行没有了，说明其为最短的单词，因为共同前缀的长度不能长于最短单词，所以此时返回已经找出的共同前缀。每次取出第一个字符串的某一个位置的单词，然后遍历其他所有字符串的对应位置看是否相等，如果有不满足的直接返回 res，如果都相同，则将当前字符存入结果，继续检查下一个位置的字符.
## 关键点解析

## 代码
C++ 解法一：

```
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) return "";
        string res = "";
        for (int j = 0; j < strs[0].size(); ++j) {
            char c = strs[0][j];
            for (int i = 1; i < strs.size(); ++i) {
                if (j >= strs[i].size() || strs[i][j] != c) {
                    return res;
                }
            }
            res.push_back(c);
        }
        return res;
    }
};

```

 

Java 解法一：

```
public class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        String res = new String();
        for (int j = 0; j < strs[0].length(); ++j) {
            char c = strs[0].charAt(j);
            for (int i = 1; i < strs.length; ++i) {
                if (j >= strs[i].length() || strs[i].charAt(j) != c) {
                    return res;
                }
            }
            res += Character.toString(c);
        }
        return res;
    }
}

```

 

我们可以对上面的方法进行适当精简，如果发现当前某个字符和第一个字符串对应位置的字符不相等，说明不会再有更长的共同前缀了，直接通过用 substr 的方法直接取出共同前缀的子字符串。如果遍历结束前没有返回结果的话，说明第一个单词就是公共前缀，返回为结果即可。代码如下：

 

C++ 解法二：

```
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) return "";
        for (int j = 0; j < strs[0].size(); ++j) {
            for (int i = 0; i < strs.size(); ++i) {
                if (j >= strs[i].size() || strs[i][j] != strs[0][j]) {
                    return strs[i].substr(0, j);
                }
            }
        }
        return strs[0];
    }
};

```

 

Java 解法二：

```
class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        for (int j = 0; j < strs[0].length(); ++j) {
            for (int i = 0; i < strs.length; ++i) {
                if (j >= strs[i].length() || strs[i].charAt(j) != strs[0].charAt(j)) {
                    return strs[i].substring(0, j); 
                }   
            }
        }
        return strs[0];
    }
}

```

 

我们再来看一种解法，这种方法给输入字符串数组排了个序，想想这样做有什么好处？既然是按字母顺序排序的话，那么有共同字母多的两个字符串会被排到一起，而跟大家相同的字母越少的字符串会被挤到首尾两端，那么如果有共同前缀的话，一定会出现在首尾两端的字符串中，所以只需要找首尾字母串的共同前缀即可。比如例子1排序后为 ["flight", "flow", "flower"]，例子2排序后为 ["cat", "dog", "racecar"]，虽然例子2没有共同前缀，但也可以认为共同前缀是空串，且出现在首尾两端的字符串中。由于是按字母顺序排的，而不是按长度，所以首尾字母的长度关系不知道，为了防止溢出错误，只遍历而这种较短的那个的长度，找出共同前缀返回即可，参见代码如下：

 

C++ 解法三：

```
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) return "";
        sort(strs.begin(), strs.end());
        int i = 0, len = min(strs[0].size(), strs.back().size());
        while (i < len && strs[0][i] == strs.back()[i]) ++i;
        return strs[0].substr(0, i);
    }
};

```

 

Java 解法三：

```
class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        Arrays.sort(strs);
        int i = 0, len = Math.min(strs[0].length(), strs[strs.length - 1].length());
        while (i < len && strs[0].charAt(i) == strs[strs.length - 1].charAt(i)) i++;
        return strs[0].substring(0, i);
    }
}
```
本文参考自：
[https://github.com/grandyang/leetcode/](https://github.com/grandyang/leetcode/)  & 
[https://github.com/azl397985856/leetcode](https://github.com/azl397985856/leetcode)
