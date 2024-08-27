+++
title = 'R激活conda环境'
date = 2024-08-07T08:52:12+08:00
draft = false
+++

```
    #### 启用conda环境 ####
    if (exists("env_activated", envir = .GlobalEnv)) {
        message("conda环境已激活.")
    } else {
        if (!is.null(conda_env)) {
            message("正在激活conda环境...")
            env_activated <<- TRUE # 只需要激活一次，重复激活会出错
            library(reticulate)
            use_condaenv(condaenv = conda_env)
            suppressWarnings(py_config())
        }
    }
```

