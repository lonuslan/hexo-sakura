title: daily leetcode - container-with-most-water - !
date: '2020-01-30 11:57:54'
photos: https://img.hacpai.com/bing/20180605.jpg?imageView2/1/w/960/h/540/interlace/1/q/100
updated: '2020-01-30 12:09:28'
tags: [daily-leetcode]
permalink: /articles/2020/01/30/1580356674021.html
---
![](https://img.hacpai.com/bing/20180605.jpg?imageView2/1/w/960/h/540/interlace/1/q/100)

## 题目地址
https://leetcode.com/problems/container-with-most-water/
## 题目描述
```
Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

Note: You may not slant the container and n is at least 2.
```

![mark](https://img.lonuslan.com/lonuslan/20200130/B354uPo7uP9E.jpg)
```

The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

 

Example:

Input: [1,8,6,2,5,4,8,3,7]
Output: 49
```
## 思路
符合直觉的解法是，我们可以对两两进行求解，计算可以承载的水量。 然后不断更新最大值，最后返回最大值即可。
这种解法，需要两层循环，时间复杂度是O(n^2)
eg:

```js
   // 这个解法比较暴力，效率比较低
    // 时间复杂度是O(n^2)
    let max = 0;
    for(let i = 0; i < height.length; i++) {
        for(let j = i + 1; j < height.length; j++) {
            const currentArea = Math.abs(i - j) * Math.min(height[i], height[j]);
            if (currentArea > max) {
                max = currentArea;
            }
        }
    }
    return max;

```
> 这种符合直觉的解法有点像冒泡排序， 大家可以稍微类比一下

那么有没有更加优的解法呢？我们来换个角度来思考这个问题，上述的解法是通过两两组合，这无疑是完备的，
那我门是否可以先计算长度为n的面积，然后计算长度为n-1的面积，... 计算长度为1的面积。 这样去不断更新最大值呢？
很显然这种解法也是完备的，但是似乎时间复杂度还是O(n ^ 2), 不要着急。

考虑一下，如果我们计算n-1长度的面积的时候,是直接直接排除一半的结果的。

如图：

![mark](https://img.lonuslan.com/lonuslan/20200130/0c3sqJM57el7.png)


比如我们计算n面积的时候，假如左侧的线段高度比右侧的高度低，那么我们通过左移右指针来将长度缩短为n-1的做法是没有意义的，
因为`新的形成的面积变成了(n-1) * heightOfLeft 这个面积一定比刚才的长度为n的面积nn * heightOfLeft 小`

也就是说最大面积`一定是当前的面积或者通过移动短的线段得到`。

### 思路2

这道求装最多水的容器的题和那道 [Trapping Rain Water](http://www.cnblogs.com/grandyang/p/4402392.html) 很类似，但又有些不同，那道题让求整个能收集雨水的量，这道只是让求最大的一个的装水量，而且还有一点不同的是，那道题容器边缘不能算在里面，而这道题却可以算，相比较来说还是这道题容易一些，这里需要定义i和j两个指针分别指向数组的左右两端，然后两个指针向中间搜索，每移动一次算一个值和结果比较取较大的，容器装水量的算法是找出左右两个边缘中较小的那个乘以两边缘的距离.

## 关键点解析
- 双指针优化时间复杂度
## 代码

* 语言支持：JS，C++

JavaScript Code:

```js
/*
 * @lc app=leetcode id=11 lang=javascript
 *
 * [11] Container With Most Water
 *
 * https://leetcode.com/problems/container-with-most-water/description/
 *
 * algorithms
 * Medium (42.86%)
 * Total Accepted:    344.3K
 * Total Submissions: 790.1K
 * Testcase Example:  '[1,8,6,2,5,4,8,3,7]'
 *
 * Given n non-negative integers a1, a2, ..., an , where each represents a
 * point at coordinate (i, ai). n vertical lines are drawn such that the two
 * endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together
 * with x-axis forms a container, such that the container contains the most
 * water.
 * 
 * Note: You may not slant the container and n is at least 2.
 * 
 * 
 * 
 * 
 * 
 * The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In
 * this case, the max area of water (blue section) the container can contain is
 * 49. 
 * 
 * 
 * 
 * Example:
 * 
 * 
 * Input: [1,8,6,2,5,4,8,3,7]
 * Output: 49
 * 
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    if (!height || height.length <= 1) return 0;
    
    // 双指针来进行优化
    // 时间复杂度是O(n)
    let leftPos = 0;
    let rightPos = height.length - 1;
    let max = 0;
    while(leftPos < rightPos) {
        
        const currentArea = Math.abs(leftPos - rightPos) * Math.min(height[leftPos] , height[rightPos]);
        if (currentArea > max) {
            max = currentArea;
        }
        // 更新小的
        if (height[leftPos] < height[rightPos]) {
            leftPos++;
        } else { // 如果相等就随便了
            rightPos--;
        }
    }

    return max;
};
```
C++ Code:
```C++
class Solution {
public:
    int maxArea(vector<int>& height) {
        auto ret = 0ul, leftPos = 0ul, rightPos = height.size() - 1;
        while( leftPos < rightPos)
        {
            ret = std::max(ret, std::min(height[leftPos], height[rightPos]) * (rightPos - leftPos));
            if (height[leftPos] < height[rightPos]) ++leftPos;
            else --rightPos;
        }
        return ret;
    }
};
```
### 代码2
C++ 解法一：

```
class Solution {
public:
    int maxArea(vector<int>& height) {
        int res = 0, i = 0, j = height.size() - 1;
        while (i < j) {
            res = max(res, min(height[i], height[j]) * (j - i));
            height[i] < height[j] ? ++i : --j;
        }
        return res;
    }
};

```

 

Java 解法一：

```
public class Solution {
    public int maxArea(int[] height) {
        int res = 0, i = 0, j = height.length - 1;
        while (i < j) {
            res = Math.max(res, Math.min(height[i], height[j]) * (j - i));
            if (height[i] < height[j]) ++i;
            else --j;
        }
        return res;
    }
}

```

 

这里需要注意的是，由于 Java 中的三元运算符 A?B:C 必须须要有返回值，所以只能用 if..else.. 来替换，不知道 Java 对于三元运算符这么严格的限制的原因是什么。

下面这种方法是对上面的方法进行了小幅度的优化，对于相同的高度们直接移动i和j就行了，不再进行计算容量了，参见代码如下：

 

C++ 解法二：

```
class Solution {
public:
    int maxArea(vector<int>& height) {
        int res = 0, i = 0, j = height.size() - 1;
        while (i < j) {
            int h = min(height[i], height[j]);
            res = max(res, h * (j - i));
            while (i < j && h == height[i]) ++i;
            while (i < j && h == height[j]) --j;
        }
        return res;
    }
};

```

 

Java 解法二：

```
public class Solution {
    public int maxArea(int[] height) {
        int res = 0, i = 0, j = height.length - 1;
        while (i < j) {
            int h = Math.min(height[i], height[j]);
            res = Math.max(res, h * (j - i));
            while (i < j && h == height[i]) ++i;
            while (i < j && h == height[j]) --j;
        }
        return res;
    }
}
```

本文参考自：
[https://github.com/grandyang/leetcode/](https://github.com/grandyang/leetcode/)  & 
[https://github.com/azl397985856/leetcode](https://github.com/azl397985856/leetcode)
