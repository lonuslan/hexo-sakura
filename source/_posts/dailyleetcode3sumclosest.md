title: daily leetcode - 3sum-closest - !
date: '2020-01-31 10:11:09'
photos: https://img.hacpai.com/bing/20180421.jpg?imageView2/1/w/960/h/540/interlace/1/q/100
updated: '2020-01-31 11:01:32'
tags: [daily-leetcode]
permalink: /articles/2020/01/31/1580436668883.html
---
![](https://img.hacpai.com/bing/20180421.jpg?imageView2/1/w/960/h/540/interlace/1/q/100)

## 题目地址

https://leetcode.com/problems/3sum-closest/

## 题目描述

Given an array `nums` of  *n*  integers and an integer `target`, find three integers in `nums` such that the sum is closest to `target`. Return the sum of the three integers. You may assume that each input would have exactly one solution.

Example:

```
Given array nums = [-1, 2, 1, -4], and target = 1.

The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
```

## 思路

这道题让我们求最接近给定值的三数之和，是在之前那道 [3Sum](http://www.cnblogs.com/grandyang/p/4481576.html) 的基础上又增加了些许难度，那么这道题让返回这个最接近于给定值的值，即要保证当前三数和跟给定值之间的差的绝对值最小，所以需要定义一个变量 diff 用来记录差的绝对值，然后还是要先将数组排个序，然后开始遍历数组，思路跟那道三数之和很相似，都是先确定一个数，然后用两个指针 left 和 right 来滑动寻找另外两个数，每确定两个数，求出此三数之和，然后算和给定值的差的绝对值存在 newDiff 中，然后和 diff 比较并更新 diff 和结果 closest 即可。

## 关键点解析

## 代码

```
class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        int closest = nums[0] + nums[1] + nums[2];
        int diff = abs(closest - target);
        sort(nums.begin(), nums.end());
        for (int i = 0; i < nums.size() - 2; ++i) {
            int left = i + 1, right = nums.size() - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                int newDiff = abs(sum - target);
                if (diff > newDiff) {
                    diff = newDiff;
                    closest = sum;
                }
                if (sum < target) ++left;
                else --right;
            }
        }
        return closest;
    }
};
```

本文参考自：
[https://github.com/grandyang/leetcode/](https://github.com/grandyang/leetcode/)  &
[https://github.com/azl397985856/leetcode](https://github.com/azl397985856/leetcode)
