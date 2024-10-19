+++
title = 'Whisper语音转文字本地大模型'
date = 2024-05-13T20:42:16+08:00
draft = false

+++

会议之后，将录音转文字是非常重要但又痛苦的事情，由于录音的信息密度非常不均匀，重点分散在各个时间戳上面，完整地听完并整理成文字将耗费大量的时间。  因此直接将语音**准确地**转成带**时间戳**的文字，可以帮助我们快速**锁定**重点内容进行理解，是提高效率的重中之重！然而，当前市面上的工具鱼龙混杂，使用在线工具存在以下问题：1. 收费；2. 准确度不够；3. 不安全。

好消息！OpenAI推出了开源自动语音识别 (ASR) 模型 `Whisper`，我们可以自己搭建本地语音转文字大模型，准确率嘎嘎的，不要钱，不吃GPU（没GPU速度比较慢）。

效果展示：


![image-20240513225204354](https://raw.githubusercontent.com/HushWay/Typora-img/main/img/image-20240513225204354.png)

## 环境

> windows 10 CMD 测试OK

## 软件安装

1. 根据[官网](https://github.com/ggerganov/whisper.cpp)说明编译，或者windows直接下载我提供的压缩包，提供了`whisper+ffmpeg`软件，解压即可。

   > 链接：https://pan.baidu.com/s/17VMcDcfw0GsKoq_UEvOuHQ 
   > 提取码：1234

2. 下载训练好的大模型[`ggml-medium.bin`](https://huggingface.co/ggerganov/whisper.cpp/blob/main/ggml-medium.bin)（推荐这个中等模型，1.40GB不会很大，准确率也不会低）。

## 使用（修改相关路径）

1. [预处理]`whisper.cpp`只支持16bit WAV文件，因此通过`ffmpeg`先将视频、录音等其他格式的文件统一转成此音频格式：

   ```
   D:\ffmpeg\bin\ffmpeg.exe -i D:\5-13-10点19分.m4a -ar 16000 -ac 1 -c:a pcm_s16le output.wav 
   ```


2. `CMD`输入以下内容转文字：

   > 注：1.  由于可以识别各种语言，设置提示词避免输出繁体中文；2.其它参数解释见[whisper.cpp](https://github.com/ggerganov/whisper.cpp)。
   >
   ```
   chcp 65001 # 避免乱码
   D:\whisper-cpp\1.5.4\main.exe -f .\output.wav -m D:\models\ggml-medium.bin -l auto --prompt "以下是普通话的句子" -otxt
	```
