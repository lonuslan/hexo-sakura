title: daily leetcode - 3sum - !
date: '2020-01-30 12:08:23'
photos: https://img.hacpai.com/bing/20181026.jpg?imageView2/1/w/960/h/540/interlace/1/q/100
updated: '2020-01-30 12:09:59'
tags: [daily-leetcode]
permalink: /articles/2020/01/30/1580357303126.html
---
![](https://img.hacpai.com/bing/20181230.jpg?imageView2/1/w/960/h/540/interlace/1/q/100)

## 题目地址
https://leetcode.com/problems/3sum/
## 题目描述
Given an array  *S*  of  *n*  integers, are there elements  *a* ,  *b* ,  *c*  in  *S*  such that  *a*  +  *b*  +  *c*  = 0? Find all unique triplets in the array which gives the sum of zero.

Note:

* Elements in a triplet ( *a* , *b* , *c* ) must be in non-descending order. (ie,  *a*  ≤  *b*  ≤  *c* )
* The solution set must not contain duplicate triplets.

 

```
    For example, given array S = {-1 0 1 2 -1 -4},

    A solution set is:
    (-1, 0, 1)
    (-1, -1, 2)
```
## 思路
这道题让我们求三数之和，比之前那道 [Two Sum](http://www.cnblogs.com/grandyang/p/4130379.html) 要复杂一些，博主考虑过先 fix 一个数，然后另外两个数使用 [Two Sum](http://www.cnblogs.com/grandyang/p/4130379.html) 那种 HashMap 的解法，但是会有重复结果出现，就算使用 TreeSet 来去除重复也不行，会 TLE，看来此题并不是考 [Two Sum](http://www.cnblogs.com/grandyang/p/4130379.html) 的解法。来分析一下这道题的特点，要找出三个数且和为0，那么除了三个数全是0的情况之外，肯定会有负数和正数，还是要先 fix 一个数，然后去找另外两个数，只要找到两个数且和为第一个 fix 数的相反数就行了，既然另外两个数不能使用 [Two Sum](http://www.cnblogs.com/grandyang/p/4130379.html) 的那种解法来找，如何能更有效的定位呢？我们肯定不希望遍历所有两个数的组合吧，所以如果数组是有序的，那么就可以用双指针以线性时间复杂度来遍历所有满足题意的两个数组合。

对原数组进行排序，然后开始遍历排序后的数组，这里注意不是遍历到最后一个停止，而是到倒数第三个就可以了。这里可以先做个剪枝优化，就是当遍历到正数的时候就 break，为啥呢，因为数组现在是有序的了，如果第一个要 fix 的数就是正数了，则后面的数字就都是正数，就永远不会出现和为0的情况了。然后还要加上重复就跳过的处理，处理方法是从第二个数开始，如果和前面的数字相等，就跳过，因为不想把相同的数字fix两次。对于遍历到的数，用0减去这个 fix 的数得到一个 target，然后只需要再之后找到两个数之和等于 target 即可。用两个指针分别指向 fix 数字之后开始的数组首尾两个数，如果两个数和正好为 target，则将这两个数和 fix 的数一起存入结果中。然后就是跳过重复数字的步骤了，两个指针都需要检测重复数字。如果两数之和小于 target，则将左边那个指针i右移一位，使得指向的数字增大一些。同理，如果两数之和大于 target，则将右边那个指针j左移一位，使得指向的数字减小一些.

### 思路2
我们采用`分治`的思想. 想要找出三个数相加等于0，我们可以数组依次遍历，
每一项a[i]我们都认为它是最终能够用组成0中的一个数字，那么我们的目标就是找到
剩下的元素（除a[i]）`两个`相加等于-a[i].

通过上面的思路，我们的问题转化为了`给定一个数组，找出其中两个相加等于给定值`，
这个问题是比较简单的， 我们只需要对数组进行排序，然后双指针解决即可。 加上我们需要外层遍历依次数组，因此总的时间复杂度应该是O(N^2)。

思路如图所示：

![mark](https://img.lonuslan.com/lonuslan/20200130/5O57RELtuV0e.png)

> 在这里之所以要排序解决是因为， 我们算法的瓶颈在这里不在于排序，而在于O(N^2)，如果我们瓶颈是排序，就可以考虑别的方式了


> 如果找某一个特定元素，一个指针就够了。如果是找两个元素满足一定关系（比如求和等于特定值），需要双指针，
当然前提是数组有序。

## 关键点解析
- 排序之后，用双指针
- 分治
## 代码
解法一：

```
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> res;
        sort(nums.begin(), nums.end());
        if (nums.empty() || nums.back() < 0 || nums.front() > 0) return {};
        for (int k = 0; k < (int)nums.size() - 2; ++k) {
            if (nums[k] > 0) break;
            if (k > 0 && nums[k] == nums[k - 1]) continue;
            int target = 0 - nums[k], i = k + 1, j = (int)nums.size() - 1;
            while (i < j) {
                if (nums[i] + nums[j] == target) {
                    res.push_back({nums[k], nums[i], nums[j]});
                    while (i < j && nums[i] == nums[i + 1]) ++i;
                    while (i < j && nums[j] == nums[j - 1]) --j;
                    ++i; --j;
                } else if (nums[i] + nums[j] < target) ++i;
                else --j;
            }
        }
        return res;
    }
};

```

 

或者我们也可以利用 TreeSet 的不能包含重复项的特点来防止重复项的产生，那么就不需要检测数字是否被 fix 过两次，不过个人觉得还是前面那种解法更好一些，参见代码如下：

 

解法二：

```
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        set<vector<int>> res;
        sort(nums.begin(), nums.end());
        if (nums.empty() || nums.back() < 0 || nums.front() > 0) return {};
        for (int k = 0; k < (int)nums.size() - 2; ++k) {
            if (nums[k] > 0) break;
            int target = 0 - nums[k], i = k + 1, j = (int)nums.size() - 1;
            while (i < j) {
                if (nums[i] + nums[j] == target) {
                    res.insert({nums[k], nums[i], nums[j]});
                    while (i < j && nums[i] == nums[i + 1]) ++i;
                    while (i < j && nums[j] == nums[j - 1]) --j;
                    ++i; --j;
                } else if (nums[i] + nums[j] < target) ++i;
                else --j;
            }
        }
        return vector<vector<int>>(res.begin(), res.end());
    }
};
```

### 代码2
```js

/*
 * @lc app=leetcode id=15 lang=javascript
 *
 * [15] 3Sum
 *
 * https://leetcode.com/problems/3sum/description/
 *
 * algorithms
 * Medium (23.51%)
 * Total Accepted:    531.5K
 * Total Submissions: 2.2M
 * Testcase Example:  '[-1,0,1,2,-1,-4]'
 *
 * Given an array nums of n integers, are there elements a, b, c in nums such
 * that a + b + c = 0? Find all unique triplets in the array which gives the
 * sum of zero.
 *
 * Note:
 *
 * The solution set must not contain duplicate triplets.
 *
 * Example:
 *
 *
 * Given array nums = [-1, 0, 1, 2, -1, -4],
 *
 * A solution set is:
 * [
 * ⁠ [-1, 0, 1],
 * ⁠ [-1, -1, 2]
 * ]
 *
 *
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  if (nums.length < 3) return [];
  const list = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    // skip duplicated result without set
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i;
    let right = nums.length - 1;
   
    // for each index i
    // we want to find the triplet [i, left, right] which sum to 0
    while (left < right) {
      // skip i === left or i === right, in that case, the index i will be used twice
      if (left === i) {
        left++;
      } else if (right === i) {
        right--;
      } else if (nums[left] + nums[right] + nums[i] === 0) {
        list.push([nums[left], nums[right], nums[i]]);
        // skip duplicated result without set
        while(nums[left] === nums[left + 1]) {
            left++;
        }
        left++;
        // skip duplicated result without set
        while(nums[right] === nums[right - 1]) {
            right--;
        }
        right--;
        continue;
      } else if (nums[left] + nums[right] + nums[i] > 0) {
        right--;
      } else {
        left++;
      }
    }
  }
  return list;
};
```

本文参考自：
[https://github.com/grandyang/leetcode/](https://github.com/grandyang/leetcode/)  & 
[https://github.com/azl397985856/leetcode](https://github.com/azl397985856/leetcode)
