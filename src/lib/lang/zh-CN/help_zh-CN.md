Markdown 语法简介
=============
<!-- [语法详解](http://commonmark.org/help/) -->
[[toc]]

## **目录**
```
[[toc]]
```

## **粗体**
```
**粗体**
__粗体__
```
## *斜体*
```
*斜体*
_斜体_
```
## 标题
```
# 一级标题 #
一级标题
====
## 二级标题 ##
二级标题
----
### 三级标题 ###
#### 四级标题 ####
##### 五级标题 #####
###### 六级标题 ######
```
## 分割线
```
***
---
```
****

## 间距
每一个的(垂直)间距是8px，可以连续使用多个
::: br :::
::: br :::

```
::: br :::
::: br :::
```

## ^上^角~下~标
```
上角标 x^2^
下角标 H~2~0
```
## ++下划线++ ~~中划线~~
```
++下划线++
~~中划线~~
```
## ==标记==
```
==标记==
```
## 段落引用
```
> 一级
>> 二级
>>> 三级
...
```

## 列表
```
有序列表
1.
2.
3.
...
无序列表
-
-
...
```

## 任务列表

- [x] 已完成任务
- [ ] 未完成任务

```
- [x] 已完成任务
- [ ] 未完成任务
```

## 链接
```
[链接](www.baidu.com)
![图片描述](http://www.image.com)
```

## 代码段落
\``` type

代码段落

\```

\` 代码块 \`

```c++
int main()
{
    printf("hello world!");
}
```

## 表格(table)
```
| 标题1 | 标题2 | 标题3 |
| :--  | :--: | ----: |
| 左对齐 | 居中 | 右对齐 |
| ---------------------- | ------------- | ----------------- |
```
| 标题1 | 标题2 | 标题3 |
| :--  | :--: | ----: |
| 左对齐 | 居中 | 右对齐 |
| ---------------------- | ------------- | ----------------- |

## 表情(emoji)
[参考网站: https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
```
:laughing:
:blush:
:smiley:
:)
...
```
:laughing::blush::smiley::)

## 图片
支持自定义图片的尺寸（宽高），具体语法如下
> 备注： test表示图片缺少是显示的文字，支持自定义，一般指图片的名字

![test](https://pic2.zhimg.com/80/v2-14e5c9f519d6fd5f0f09b36af959e63c_hd.png)
![test](https://pic2.zhimg.com/80/v2-14e5c9f519d6fd5f0f09b36af959e63c_hd.png =100x)
![test](https://pic2.zhimg.com/80/v2-14e5c9f519d6fd5f0f09b36af959e63c_hd.png =200x100)
![test](https://pic2.zhimg.com/80/v2-14e5c9f519d6fd5f0f09b36af959e63c_hd.png =x100)
```
原图
![test](https://pic2.zhimg.com/80/v2-14e5c9f519d6fd5f0f09b36af959e63c_hd.png)
宽度固定，高度自适应
![test](https://pic2.zhimg.com/80/v2-14e5c9f519d6fd5f0f09b36af959e63c_hd.png =100x)
高度固定，宽度自适应
![test](https://pic2.zhimg.com/80/v2-14e5c9f519d6fd5f0f09b36af959e63c_hd.png =x100)
固定宽高
![test](https://pic2.zhimg.com/80/v2-14e5c9f519d6fd5f0f09b36af959e63c_hd.png =200x100)

```

## 公式

我们可以渲染公式例如：$x_i + y_i = z_i$和$\sum_{i=1}^n a_i=0$
我们也可以单行渲染
$$\sum_{i=1}^n a_i=0$$
具体可参照[katex文档](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex支持的函数](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex文档](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## 布局

::: hljs-left
`::: hljs-left`
`居左`
`:::`
:::

::: hljs-center
`::: hljs-center`
`居中`
`:::`
:::

::: hljs-right
`::: hljs-right`
`居右`
`:::`
:::


## 高级布局
### 两列
:::: row :gutter="12"
::: col :span="7"
第一列
这是普通文本


这是一个危险警告
  
:::

::: col :span="7"
第二列

这是普通文本
  
:::
::::

### 三列
:::: row
::: col :span="5"
第一列
这是普通文本
:::

::: col :span="5"
第二列
这是普通文本
:::

::: col :span="4"
第三列
这是普通文本
:::
::::

### 四列
:::: row
::: col :span="3"
第一列
这是普通文本
:::

::: col :span="3"
第二列
这是普通文本
:::

::: col :span="3"
第三列
这是普通文本
:::
::: col :span="3"
第四列
这是普通文本
:::
::::


### 左文右图
:::: row
::: col :span="10"
第四列
这是普通文本
:::

::: col :span="5"
这是一个危险警告
![test](https://pic2.zhimg.com/80/v2-14e5c9f519d6fd5f0f09b36af959e63c_hd.png =100x100)
:::
::::

:::: row
::: col :span="10"
![test](https://pic2.zhimg.com/80/v2-14e5c9f519d6fd5f0f09b36af959e63c_hd.png)
:::

::: col :span="5"
左图右文
这是普通文本
:::
::::
