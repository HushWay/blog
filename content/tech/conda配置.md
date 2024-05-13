+++
title = 'Conda配置'
date = 2024-05-12T16:11:05+08:00
draft = true
+++

1. 编辑`~/.condarc`，通过以下方式添加镜像：

```
ssl_verify: true
show_channel_urls: true
 
channels:
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
```

