title: daily leetcode - median-of-two-sorted-arrays - !
date: '2020-01-29 18:30:40'
updated: '2020-01-29 18:53:15'
tags: [daily-leetcode]
permalink: /articles/2020/01/29/1580293839915.html
---
![](https://img.hacpai.com/bing/20171114.jpg?imageView2/1/w/960/h/540/interlace/1/q/100)

## 题目地址
https://leetcode.com/problems/median-of-two-sorted-arrays/
## 题目描述
```
There are two sorted arrays nums1 and nums2 of size m and n respectively.

Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

You may assume nums1 and nums2 cannot be both empty.

Example 1:

nums1 = [1, 3]
nums2 = [2]

The median is 2.0
Example 2:

nums1 = [1, 2]
nums2 = [3, 4]

The median is (2 + 3)/2 = 2.5
```
## 思路
首先了解一下Median的概念，一个数组中median就是把数组分成左右等分的中位数。

如下图：
![mark](https://img.lonuslan.com/lonuslan/20200129/xddgQRN1JeYi.jpg)

这道题，很容易想到暴力解法，时间复杂度和空间复杂度都是`O(m+n)`, 不符合题中给出`O(log(m+n))`时间复杂度的要求。
我们可以从简单的解法入手，试了一下，暴力解法也是可以被Leetcode Accept的. 分析中会给出两种解法，暴力求解和二分解法。

#### 解法一 - 暴力 （Brute Force）
暴力解主要是要merge两个排序的数组`（A，B）`成一个排序的数组。

用两个`pointer（i，j）`，`i` 从数组`A`起始位置开始，即`i=0`开始，`j` 从数组`B`起始位置， 即`j=0`开始. 
一一比较 `A[i] 和 B[j]`, 
1. 如果`A[i] <= B[j]`, 则把`A[i]` 放入新的数组中，i往后移一位，即 `i+1`.
2. 如果`A[i] > B[j]`, 则把`B[j]` 放入新的数组中，j往后移一位，即 `j+1`.
3. 重复步骤#1 和 #2，直到`i`移到`A`最后，或者`j`移到`B`最后。
4. 如果`j`移动到`B`数组最后，那么直接把剩下的所有`A`依次放入新的数组中. 
5. 如果`i`移动到`A`数组最后，那么直接把剩下的所有`B`依次放入新的数组中.

Merge的过程如下图。
![mark](https://img.lonuslan.com/lonuslan/20200129/qTiwOA4sUNIf.jpg)


*时间复杂度： `O(m+n) - m is length of A, n is length of B`*

*空间复杂度： `O(m+n)`*

#### 解法二 - 二分查找 （Binary Search）
由于题中给出的数组都是排好序的，在排好序的数组中查找很容易想到可以用二分查找（Binary Search), 这里对数组长度小的做二分，
保证数组A 和 数组B 做partition 之后

`len(Aleft)+len(Bleft)=(m+n+1)/2 - m是数组A的长度， n是数组B的长度`

对数组A的做partition的位置是区间`[0,m]`

如图：
![mark](https://img.lonuslan.com/lonuslan/20200129/74F0aOsEVlpp.png)

下图给出几种不同情况的例子（注意但左边或者右边没有元素的时候，左边用`INF_MIN`，右边用`INF_MAX`表示左右的元素：
![mark](https://img.lonuslan.com/lonuslan/20200129/uLoT8dQt3Jyv.png)

下图给出具体做的partition 解题的例子步骤，
![mark](https://img.lonuslan.com/lonuslan/20200129/ppcftIGeEbwl.png)

*时间复杂度： `O(log(min(m, n)) - m is length of A, n is length of B`*

*空间复杂度： `O(1)` - 这里没有用额外的空间*

### 思路2
这道题让我们求两个有序数组的中位数，而且限制了时间复杂度为 O(log (m+n))，看到这个时间复杂度，自然而然的想到了应该使用二分查找法来求解。但是这道题被定义为 Hard 也是有其原因的，难就难在要在两个未合并的有序数组之间使用二分法，如果这道题只有一个有序数组，让求中位数的话，估计就是个 Easy 题。对于这道题来说，可以将两个有序数组混合起来成为一个有序数组再做吗，图样图森破，这个时间复杂度限制的就是告诉你金坷垃别想啦。还是要用二分法，而且是在两个数组之间使用，感觉很高端啊。回顾一下中位数的定义，如果某个有序数组长度是奇数，那么其中位数就是最中间那个，如果是偶数，那么就是最中间两个数字的平均值。这里对于两个有序数组也是一样的，假设两个有序数组的长度分别为m和n，由于两个数组长度之和 m+n 的奇偶不确定，因此需要分情况来讨论，对于奇数的情况，直接找到最中间的数即可，偶数的话需要求最中间两个数的平均值。为了简化代码，不分情况讨论，使用一个小 trick，分别找第 (m+n+1) / 2 个，和 (m+n+2) / 2 个，然后求其平均值即可，这对奇偶数均适用。若 m+n 为奇数的话，那么其实 (m+n+1) / 2 和 (m+n+2) / 2 的值相等，相当于两个相同的数字相加再除以2，还是其本身。

好，这里需要定义一个函数来在两个有序数组中找到第K个元素，下面重点来看如何实现找到第K个元素。首先，为了避免拷贝产生新的数组从而增加时间复杂度，使用两个变量i和j分别来标记数组 nums1 和 nums2 的起始位置。然后来处理一些 corner cases，比如当某一个数组的起始位置大于等于其数组长度时，说明其所有数字均已经被淘汰了，相当于一个空数组了，那么实际上就变成了在另一个数组中找数字，直接就可以找出来了。还有就是如果 K=1 的话，只要比较 nums1 和 nums2 的起始位置i和j上的数字就可以了。难点就在于一般的情况怎么处理？因为需要在两个有序数组中找到第K个元素，为了加快搜索的速度，可以使用二分法，那么对谁二分呢，数组么？其实要对K二分，意思是需要分别在 nums1 和 nums2 中查找第 K/2 个元素，注意这里由于两个数组的长度不定，所以有可能某个数组没有第 K/2 个数字，所以需要先 check 一下，数组中到底存不存在第 K/2 个数字，如果存在就取出来，否则就赋值上一个整型最大值（目的是要在 nums1 或者 nums2 中先淘汰 K/2 个较小的数字，判断的依据就是看 midVal1 和 midVal2 谁更小，但如果某个数组的个数都不到 K/2 个，自然无法淘汰，所以将其对应的 midVal 值设为整型最大值，以保证其不会被淘汰），若某个数组没有第 K/2 个数字，则淘汰另一个数组的前 K/2 个数字即可。举个例子来说吧，比如 nums1 = {3}，nums2 = {2, 4, 5, 6, 7}，K=4，要找两个数组混合中第4个数字，则分别在 nums1 和 nums2 中找第2个数字，而 nums1 中只有一个数字，不存在第二个数字，则 nums2 中的前2个数字可以直接跳过，为啥呢，因为要求的是整个混合数组的第4个数字，不管 nums1 中的那个数字是大是小，第4个数字绝不会出现在 nums2 的前两个数字中，所以可以直接跳过。

有没有可能两个数组都不存在第 K/2 个数字呢，这道题里是不可能的，因为K不是任意给的，而是给的 m+n 的中间值，所以必定至少会有一个数组是存在第 K/2 个数字的。最后就是二分法的核心啦，比较这两个数组的第 K/2 小的数字 midVal1 和 midVal2 的大小，如果第一个数组的第 K/2 个数字小的话，那么说明要找的数字肯定不在 nums1 中的前 K/2 个数字，可以将其淘汰，将 nums1 的起始位置向后移动 K/2 个，并且此时的K也自减去 K/2，调用递归，举个例子来说吧，比如 nums1 = {1, 3}，nums2 = {2, 4, 5}，K=4，要找两个数组混合中第4个数字，那么分别在 nums1 和 nums2 中找第2个数字，nums1 中的第2个数字是3，nums2 中的第2个数字是4，由于3小于4，所以混合数组中第4个数字肯定在 nums2 中，可以将 nums1 的起始位置向后移动 K/2 个。反之，淘汰 nums2 中的前 K/2 个数字，并将 nums2 的起始位置向后移动 K/2 个，并且此时的K也自减去 K/2，调用递归即可.

## 关键点解析
1. 暴力求解，在线性时间内merge两个排好序的数组成一个数组。
2. 二分查找，关键点在于
  - 要partition两个排好序的数组成左右两等份，partition需要满足`len(Aleft)+len(Bleft)=(m+n+1)/2 - m是数组A的长度， n是数组B的长度`

  - 并且partition后 A左边最大(`maxLeftA`), A右边最小（`minRightA`), B左边最大（`maxLeftB`), B右边最小（`minRightB`) 满足
`(maxLeftA <= minRightB && maxLeftB <= minRightA)`

有了这两个条件，那么median就在这四个数中，根据奇数或者是偶数，
```
奇数：
median = max(maxLeftA, maxLeftB)
偶数：
median = (max(maxLeftA, maxLeftB) + min(minRightA, minRightB)) / 2
```
## 代码
*解法一 - 暴力解法（Brute force）*
```java
class MedianTwoSortedArrayBruteForce {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
      int[] newArr = mergeTwoSortedArray(nums1, nums2);
      int n = newArr.length;
      if (n % 2 == 0) {
        // even
        return (double) (newArr[n / 2] + newArr[n / 2 - 1]) / 2;
      } else {
        // odd
        return (double) newArr[n / 2];
      }
    }
    private int[] mergeTwoSortedArray(int[] nums1, int[] nums2) {
      int m = nums1.length;
      int n = nums2.length;
      int[] res = new int[m + n];
      int i = 0;
      int j = 0;
      int idx = 0;
      while (i < m && j < n) {
        if (nums1[i] <= nums2[j]) {
          res[idx++] = nums1[i++];
        } else {
          res[idx++] = nums2[j++];
        }
      }
      while (i < m) {
        res[idx++] = nums1[i++];
      }
      while (j < n) {
        res[idx++] = nums2[j++];
      }
      return res;
    }
}
```
*解法二 - 二分查找（Binary Search*
```java
class MedianSortedTwoArrayBinarySearch {
  public static double findMedianSortedArraysBinarySearch(int[] nums1, int[] nums2) {
     // do binary search for shorter length array, make sure time complexity log(min(m,n)).
     if (nums1.length > nums2.length) {
        return findMedianSortedArraysBinarySearch(nums2, nums1);
      }
      int m = nums1.length;
      int n = nums2.length;
      int lo = 0;
      int hi = m;
      while (lo <= hi) {
        // partition A position i
        int i = lo + (hi - lo) / 2;
        // partition B position j
        int j = (m + n + 1) / 2 - i;
        
        int maxLeftA = i == 0 ? Integer.MIN_VALUE : nums1[i - 1];
        int minRightA = i == m ? Integer.MAX_VALUE : nums1[i];
  
        int maxLeftB = j == 0 ? Integer.MIN_VALUE : nums2[j - 1];
        int minRightB = j == n ? Integer.MAX_VALUE : nums2[j];
  
        if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
          // total length is even
          if ((m + n) % 2 == 0) {
            return (double) (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2;
          } else {
            // total length is odd
            return (double) Math.max(maxLeftA, maxLeftB);
          }
        } else if (maxLeftA > minRightB) {
          // binary search left half
          hi = i - 1;
        } else {
          // binary search right half
          lo = i + 1;
        }
      }
      return 0.0;
    }
}
```

### 代码2
C++ 解法一：

```
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size(), left = (m + n + 1) / 2, right = (m + n + 2) / 2;
        return (findKth(nums1, 0, nums2, 0, left) + findKth(nums1, 0, nums2, 0, right)) / 2.0;
    }
    int findKth(vector<int>& nums1, int i, vector<int>& nums2, int j, int k) {
        if (i >= nums1.size()) return nums2[j + k - 1];
        if (j >= nums2.size()) return nums1[i + k - 1];
        if (k == 1) return min(nums1[i], nums2[j]);
        int midVal1 = (i + k / 2 - 1 < nums1.size()) ? nums1[i + k / 2 - 1] : INT_MAX;
        int midVal2 = (j + k / 2 - 1 < nums2.size()) ? nums2[j + k / 2 - 1] : INT_MAX;
        if (midVal1 < midVal2) {
            return findKth(nums1, i + k / 2, nums2, j, k - k / 2);
        } else {
            return findKth(nums1, i, nums2, j + k / 2, k - k / 2);
        }
    }
};

```

 

Java 解法一：

```
public class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int m = nums1.length, n = nums2.length, left = (m + n + 1) / 2, right = (m + n + 2) / 2;
        return (findKth(nums1, 0, nums2, 0, left) + findKth(nums1, 0, nums2, 0, right)) / 2.0;
    }
    int findKth(int[] nums1, int i, int[] nums2, int j, int k) {
        if (i >= nums1.length) return nums2[j + k - 1];
        if (j >= nums2.length) return nums1[i + k - 1];
        if (k == 1) return Math.min(nums1[i], nums2[j]);
        int midVal1 = (i + k / 2 - 1 < nums1.length) ? nums1[i + k / 2 - 1] : Integer.MAX_VALUE;
        int midVal2 = (j + k / 2 - 1 < nums2.length) ? nums2[j + k / 2 - 1] : Integer.MAX_VALUE;
        if (midVal1 < midVal2) {
            return findKth(nums1, i + k / 2, nums2, j, k - k / 2);
        } else {
            return findKth(nums1, i, nums2, j + k / 2, k - k / 2);
        }
    }
}

```

 

上面的解法一直使用的是原数组，同时用了两个变量来分别标记当前的起始位置。我们也可以直接生成新的数组，这样就不要用起始位置变量了，不过拷贝数组的操作可能会增加时间复杂度，也许会超出限制，不过就算当个思路拓展也是极好的。首先要判断数组是否为空，为空的话，直接在另一个数组找第K个即可。还有一种情况是当 K = 1 时，表示要找第一个元素，只要比较两个数组的第一个元素，返回较小的那个即可。这里分别取出两个数组的第 K/2 个数字的位置坐标i和j，为了避免数组没有第 K/2 个数组的情况，每次都和数组长度做比较，取出较小值。这里跟上面的解法有些许不同，上面解法直接取出的是值，而这里取出的是位置坐标，但是思想都是很类似的。不同在于，上面解法中每次固定淘汰 K/2 个数字，而这里由于取出了合法的i和j，所以每次淘汰i或j个。评论区有网友提出，可以让 j = k-i，这样也是对的，可能还更好一些，收敛速度可能会更快一些，参见代码如下：

 

C++ 解法二：

```
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size();
        return (findKth(nums1, nums2, (m + n + 1) / 2) + findKth(nums1, nums2, (m + n + 2) / 2)) / 2.0;
    }
    int findKth(vector<int> nums1, vector<int> nums2, int k) {
        if (nums1.empty()) return nums2[k - 1];
        if (nums2.empty()) return nums1[k - 1];
        if (k == 1) return min(nums1[0], nums2[0]);
        int i = min((int)nums1.size(), k / 2), j = min((int)nums2.size(), k / 2);
        if (nums1[i - 1] > nums2[j - 1]) {
            return findKth(nums1, vector<int>(nums2.begin() + j, nums2.end()), k - j);
        } else {
            return findKth(vector<int>(nums1.begin() + i, nums1.end()), nums2, k - i);
        }
        return 0;
    }
};

```

 

Java 解法二：

```
public class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int m = nums1.length, n = nums2.length, left = (m + n + 1) / 2, right = (m + n + 2) / 2;
        return (findKth(nums1, nums2, left) + findKth(nums1, nums2, right)) / 2.0;
    }
    int findKth(int[] nums1, int[] nums2, int k) {
        int m = nums1.length, n = nums2.length;
        if (m == 0) return nums2[k - 1];
        if (n == 0) return nums1[k - 1];
        if (k == 1) return Math.min(nums1[0], nums2[0]);
        int i = Math.min(m, k / 2), j = Math.min(n, k / 2);
        if (nums1[i - 1] > nums2[j - 1]) {
            return findKth(nums1, Arrays.copyOfRange(nums2, j, n), k - j);
        } else {
            return findKth(Arrays.copyOfRange(nums1, i, m), nums2, k - i);
        }
    }
}

```

 

此题还能用迭代形式的二分搜索法来解，是一种相当巧妙的应用，这里就参照 [stellari 大神的帖子](https://leetcode.com/problems/median-of-two-sorted-arrays/discuss/2471/very-concise-ologminmn-iterative-solution-with-detailed-explanation) 来讲解吧。所谓的中位数，换一种角度去看，其实就是把一个有序数组分为长度相等的两段，中位数就是前半段的最大值和后半段的最小值的平均数，也就是离分割点相邻的两个数字的平均值。比如说对于偶数个数组 [1 3 5 7]，那么分割开来就是 [1 3 / 5 7]，其中 '/' 表示分割点，中位数就是3和5的平均值。对于奇数个数组 [1 3 4 5 7]，可以分割为 [1 3 4 / 4 5 7]，可以发现左右两边都有个4，则中位数是两个4的平均数，还是4。这里使用L表示分割点左边的数字，R表示分割点右边的数字，则对于 [1 3 5 7] 来说，L=3，R=5。对于 [1 3 4 5 7] 来说，L=4，R=4。那么对于长度为N的数组来说，可以分别得到L和R的位置，如下所示：

 

```
N        Index of L        Index of R
1            0                0
2            0                1
3            1                1
4            1                2
5            2                2
6            2                3
7            3                3
8            3                4

```

 

观察上表，可以得到规律，Idx(L)= (N-1)/2，idx(R) = N/2，所以中位数可以用下式表示：

 

```
(L + R) / 2 = (A[(N - 1) / 2] + A[N / 2]) / 2

```

 

为了统一数组长度为奇数和偶数的情况，可以使用一个小 tricky，即在每个数字的两边都加上一个特殊字符，比如井号，这个 tricky 其实在马拉车算法中也使用过，可以参见博主之前的帖子 [Manacher's Algorithm 马拉车算法](http://www.cnblogs.com/grandyang/p/4475985.html)。这样做的好处是不管奇数或者偶数，加井号后数组的长度都是奇数，并且切割点的位置也是确定的，比如：

 

```
[1 3 5 7]    ->    [# 1 # 3 # 5 # 7 #]        N = 4
index               0 1 2 3 4 5 6 7 8         newN = 9

[1 3 4 5 7]    ->    [# 1 # 3 # 4 # 5 # 7 #]        N = 5
index                 0 1 2 3 4 5 6 7 8 9 10        newN = 11

```

 

这里的N是原数组的长度，newN 是添加井号后新数组的长度，可以发现 newN = 2N+1，而且切割点永远都在新数组中坐标为N的位置，且 idx(L) = (N-1)/2，idx(R) = N/2，这里的N就可以换成分割点的位置，岂不美哉（注意这里的 idx(L) 和 idx(R) 表示的是在未填充#号的坐标位置）！现在假设有两个数组：

 

```
[1 3 4 5 7]    ->    [# 1 # 3 # 4 # 5 # 7 #]        N1 = 5
index                 0 1 2 3 4 5 6 7 8 9 10        newN1 = 11

[1 2 2 2]    ->    [# 1 # 2 # 2 # 2 #]        N2 = 4
index               0 1 2 3 4 5 6 7 8         newN2 = 9

```

 

跟只有一个数组的情况类似，这里需要找到一个切割点，使得其分别可以将两个数组分成左右两部分，需要满足的是两个左半边中的任意一个数字都要小于两个右半边数组的数字，注意这里可能有的左半边或右半边会为空，但是两个左半边数字的个数和应该等于两个右半边的个数和。这里还可以观察出一些规律：

1. 总共有 2N1 + 2N2 + 2 个位置，那么除去两个分割点，两个左右半边应该各有 N1 + N2 个数字。

2. 因此，对于一个在 A2 数组中的分割点位置 C2 = K，在 A1 数组中的位置应该为 C1 = N1 + N2 - K，比如假如在 A2 中的分割点位置为 C2 = 2，那么在 A1 中的位置为 C1 = 4 + 5 - C2 = 7。

 

```
[# 1 # 3 # 4 # (5/5) # 7 #]

[# 1 / 2 # 2 # 2 #]

```

 

3. 假如两个数组都被分割了，那么就应该会有两个L和R，分别是：

 

```
L1 = A1[(C1 - 1) / 2]
R1 = A1[C1 / 2]

L2 = A2[(C2 - 1) / 2]
R2 = A2[C2 / 2]

```

 

对于上面的例子就有：

 

```
L1 = A1[(7 - 1) / 2] = A1[3] = 5
R1 = A1[7 / 2] = A1[3] = 5

L2 = A2[(2 - 1) / 2] = A2[0] = 1
R2 = A2[2 / 2] = A2[1] = 2

```

 

现在需要检测这个切割点是否是正确的中位数的切割点，那么根据之前的分析，任意的左半边的数字都需要小于等于右半边的数字，L1 和 L2 是左半边的最大的数字，R1 和 R2 是右半边的最小的数字，所以需要满足下列关系：

 

```
L1 <= R1 && L1 <= R2 && L2 <= R1 && L2 <= R2

```

 

由于两个数组都是有序的，所以 L1 <= R1 和 L2 <= R2 都是满足的，那么就只需要满足下列的不等式即可：

 

```
L1 <= R2 && L2 <= R1

```

 

这样的话就可以利用二分搜索了，假如 L1 > R2 的话，说明数组 A1 的左半边的数字过大了，需要把切割点 C1 往左移动。假如 L2 > R1，说明数组 A2 的左半边数字过大，需要把分割点 C2 左移。若满足上面的条件，说明当前切割点就是正确的，那么中位数就可以求出来了，即为：

 

```
(max(L1, L2) + min(R1, R2)) / 2

```

 

最后还有两点注意事项：

1. 由于 C1 和 C2 是可以互相计算而得，即一个确定了，另一个就可以计算出来了。所以尽量去移动较短的那个数组，这样得到的时间复杂度为 O(lg(min(N1, N2)))。

2. 对于 corner case 的处理，当切割点在 0 或者 2n 的位置时，将L或R的值分别赋值为整型最小值和最大值，这不会改变正确的切割点的位置，会使得代码实现更加方便。

 

C++ 解法三：

```
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size();
        if (m < n) return findMedianSortedArrays(nums2, nums1);
        if (n == 0) return ((double)nums1[(m - 1) / 2] + (double)nums1[m / 2]) / 2.0;
        int left = 0, right = n * 2;
        while (left <= right) {
            int mid2 = (left + right) / 2;
            int mid1 = m + n - mid2;
            double L1 = mid1 == 0 ? INT_MIN : nums1[(mid1 - 1) / 2];
            double L2 = mid2 == 0 ? INT_MIN : nums2[(mid2 - 1) / 2];
            double R1 = mid1 == m * 2 ? INT_MAX : nums1[mid1 / 2];
            double R2 = mid2 == n * 2 ? INT_MAX : nums2[mid2 / 2];
            if (L1 > R2) left = mid2 + 1;
            else if (L2 > R1) right = mid2 - 1;
            else return (max(L1, L2) + min(R1, R2)) / 2;
        }
        return -1;
    }
};

```

 

Java 解法三：

```
public class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int m = nums1.length, n = nums2.length;
        if (m < n) return findMedianSortedArrays(nums2, nums1);
        if (n == 0) return (nums1[(m - 1) / 2] + nums1[m / 2]) / 2.0;
        int left = 0, right = 2 * n;
        while (left <= right) {
            int mid2 = (left + right) / 2;
            int mid1 = m + n - mid2;
            double L1 = mid1 == 0 ? Double.MIN_VALUE : nums1[(mid1 - 1) / 2];
            double L2 = mid2 == 0 ? Double.MIN_VALUE : nums2[(mid2 - 1) / 2];
            double R1 = mid1 == m * 2 ? Double.MAX_VALUE : nums1[mid1 / 2];
            double R2 = mid2 == n * 2 ? Double.MAX_VALUE : nums2[mid2 / 2];
            if (L1 > R2) left = mid2 + 1;
            else if (L2 > R1) right = mid2 - 1;
            else return (Math.max(L1, L2) + Math.min(R1, R2)) / 2;
        }
        return -1;
    }
}
```

本文参考自：
[https://github.com/grandyang/leetcode/](https://github.com/grandyang/leetcode/)  & 
[https://github.com/azl397985856/leetcode](https://github.com/azl397985856/leetcode)
