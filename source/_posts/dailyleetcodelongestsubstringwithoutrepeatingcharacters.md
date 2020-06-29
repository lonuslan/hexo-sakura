title: daily leetcode - longest-substring-without-repeating-characters - !
date: '2020-01-28 18:26:03'
updated: '2020-01-28 18:26:15'
tags: [daily-leetcode]
permalink: /articles/2020/01/28/1580207163206.html
---
![](https://img.hacpai.com/bing/20181221.jpg?imageView2/1/w/960/h/540/interlace/1/q/100)

## 题目地址
https://leetcode.com/problems/longest-substring-without-repeating-characters/
## 题目描述
Given a string, find the length of the longest substring without repeating characters.

Example 1:

```
Input: "abcabcbb"
Output: 3 
Explanation: The answer is "abc", with the length of 3. 

```

Example 2:

```
Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

```

Example 3:

```
Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. 
             Note that the answer must be a substring, "pwke" is a _subsequence_ and not a substring.
```
## 思路
这道求最长无重复子串的题和之前那道 [Isomorphic Strings](http://www.cnblogs.com/grandyang/p/4465779.html) 很类似，属于 LeetCode 早期经典题目，博主认为是可以跟 [Two Sum](http://www.cnblogs.com/grandyang/p/4130379.html) 媲美的一道题。给了我们一个字符串，让求最长的无重复字符的子串，注意这里是子串，不是子序列，所以必须是连续的。先不考虑代码怎么实现，如果给一个例子中的例子 "abcabcbb"，让你手动找无重复字符的子串，该怎么找。博主会一个字符一个字符的遍历，比如 a，b，c，然后又出现了一个a，那么此时就应该去掉第一次出现的a，然后继续往后，又出现了一个b，则应该去掉一次出现的b，以此类推，最终发现最长的长度为3。所以说，需要记录之前出现过的字符，记录的方式有很多，最常见的是统计字符出现的个数，但是这道题字符出现的位置很重要，所以可以使用 HashMap 来建立字符和其出现位置之间的映射。进一步考虑，由于字符会重复出现，到底是保存所有出现的位置呢，还是只记录一个位置？我们之前手动推导的方法实际上是维护了一个滑动窗口，窗口内的都是没有重复的字符，需要尽可能的扩大窗口的大小。由于窗口在不停向右滑动，所以只关心每个字符最后出现的位置，并建立映射。窗口的右边界就是当前遍历到的字符的位置，为了求出窗口的大小，需要一个变量 left 来指向滑动窗口的左边界，这样，如果当前遍历到的字符从未出现过，那么直接扩大右边界，如果之前出现过，那么就分两种情况，在或不在滑动窗口内，如果不在滑动窗口内，那么就没事，当前字符可以加进来，如果在的话，就需要先在滑动窗口内去掉这个已经出现过的字符了，去掉的方法并不需要将左边界 left 一位一位向右遍历查找，由于 HashMap 已经保存了该重复字符最后出现的位置，所以直接移动 left 指针就可以了。维护一个结果 res，每次用出现过的窗口大小来更新结果 res，就可以得到最终结果啦。

这里可以建立一个 HashMap，建立每个字符和其最后出现位置之间的映射，然后需要定义两个变量 res 和 left，其中 res 用来记录最长无重复子串的长度，left 指向该无重复子串左边的起始位置的前一个，由于是前一个，所以初始化就是 -1，然后遍历整个字符串，对于每一个遍历到的字符，如果该字符已经在 HashMap 中存在了，并且如果其映射值大于 left 的话，那么更新 left 为当前映射值。然后映射值更新为当前坐标i，这样保证了 left 始终为当前边界的前一个位置，然后计算窗口长度的时候，直接用 i-left 即可，用来更新结果 res。

这里解释下程序中那个 if 条件语句中的两个条件 m.count(s[i]) && m[s[i]] > left，因为一旦当前字符 s[i] 在 HashMap 已经存在映射，说明当前的字符已经出现过了，而若 m[s[i]] > left 成立，说明之前出现过的字符在窗口内，那么如果要加上当前这个重复的字符，就要移除之前的那个，所以让 left 赋值为 m[s[i]]，由于 left 是窗口左边界的前一个位置（这也是 left 初始化为 -1 的原因，因为窗口左边界是从0开始遍历的），所以相当于已经移除出滑动窗口了。举一个最简单的例子 "aa"，当 i=0 时，建立了 a->0 的映射，并且此时结果 res 更新为1，那么当 i=1 的时候，发现a在 HashMap 中，并且映射值0大于 left 的 -1，所以此时 left 更新为0，映射对更新为 a->1，那么此时 i-left 还为1，不用更新结果 res，那么最终结果 res 还为1，正确.

### 思路2
用一个hashmap来建立字符和其出现位置之间的映射。

维护一个滑动窗口，窗口内的都是没有重复的字符，去尽可能的扩大窗口的大小，窗口不停的向右滑动。

（1）如果当前遍历到的字符从未出现过，那么直接扩大右边界；

（2）如果当前遍历到的字符出现过，则缩小窗口（左边索引向右移动），然后继续观察当前遍历到的字符；

（3）重复（1）（2），直到左边索引无法再移动；

（4）维护一个结果res，每次用出现过的窗口大小来更新结果res，最后返回res获取结果。

![mark](https://img.lonuslan.com/lonuslan/20200128/QAK5voKCj1pV.gif)

(图片来自： https://github.com/MisterBooo/LeetCodeAnimation)
## 关键点解析
1. 用一个mapper记录出现过并且没有被删除的字符
2. 用一个滑动窗口记录当前index开始的最大的不重复的字符序列
3. 用res去记录目前位置最大的长度，每次滑动窗口更新就去决定是否需要更新res
## 代码
C++ 解法一： 

```
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int res = 0, left = -1, n = s.size();
        unordered_map<int, int> m;
        for (int i = 0; i < n; ++i) {
            if (m.count(s[i]) && m[s[i]] > left) {
                left = m[s[i]];  
            }
            m[s[i]] = i;
            res = max(res, i - left);            
        }
        return res;
    }
};

```

 

下面这种写法是上面解法的精简模式，这里我们可以建立一个 256 位大小的整型数组来代替 HashMap，这样做的原因是 ASCII 表共能表示 256 个字符，但是由于键盘只能表示 128 个字符，所以用 128 也行，然后全部初始化为 -1，这样的好处是不用像之前的 HashMap 一样要查找当前字符是否存在映射对了，对于每一个遍历到的字符，直接用其在数组中的值来更新 left，因为默认是 -1，而 left 初始化也是 -1，所以并不会产生错误，这样就省了 if 判断的步骤，其余思路都一样：

 

C++ 解法二：

```
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> m(128, -1);
        int res = 0, left = -1;
        for (int i = 0; i < s.size(); ++i) {
            left = max(left, m[s[i]]);
            m[s[i]] = i;
            res = max(res, i - left);
        }
        return res;
    }
};

```

 

Java 解法二：

```
public class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] m = new int[256];
        Arrays.fill(m, -1);
        int res = 0, left = -1;
        for (int i = 0; i < s.length(); ++i) {
            left = Math.max(left, m[s.charAt(i)]);
            m[s.charAt(i)] = i;
            res = Math.max(res, i - left);
        }
        return res;
    }
}

```

 

下面这种解法使用了 HashSet，核心算法和上面的很类似，把出现过的字符都放入 HashSet 中，遇到 HashSet 中没有的字符就加入 HashSet 中并更新结果 res，如果遇到重复的，则从左边开始删字符，直到删到重复的字符停止：

 

C++ 解法三：

```
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int res = 0, left = 0, i = 0, n = s.size();
        unordered_set<char> t;
        while (i < n) {
            if (!t.count(s[i])) {
                t.insert(s[i++]);
                res = max(res, (int)t.size());
            }  else {
                t.erase(s[left++]);
            }
        }
        return res;
    }
};

```

 

Java 解法三：

```
public class Solution {
    public int lengthOfLongestSubstring(String s) {
        int res = 0, left = 0, right = 0;
        HashSet<Character> t = new HashSet<Character>();
        while (right < s.length()) {
            if (!t.contains(s.charAt(right))) {
                t.add(s.charAt(right++));
                res = Math.max(res, t.size());
            } else {
                t.remove(s.charAt(left++));
            }
        }
        return res;
    }
}
```
### 代码2
```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  const mapper = {}; // 记录已经出现过的charactor
  let res = 0;
  let slidingWindow = [];

  for (let c of s) {
    if (mapper[c]) {
      // 已经出现过了
      // 则删除
      const delIndex = slidingWindow.findIndex(_c => _c === c);

      for (let i = 0 ; i < delIndex; i++) {
        mapper[slidingWindow[i]] = false;
      }

      slidingWindow = slidingWindow.slice(delIndex + 1).concat(c);
    } else {
      // 新字符
      if (slidingWindow.push(c) > res) {
        res = slidingWindow.length;
      }
    }
    mapper[c] = true;
  }
  return res;
};
```
本文参考自：
[https://github.com/grandyang/leetcode/](https://github.com/grandyang/leetcode/)  & 
[https://github.com/azl397985856/leetcode](https://github.com/azl397985856/leetcode)


