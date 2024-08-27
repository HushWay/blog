+++
title = 'Vscode配置'
date = 2024-07-29T15:27:21+08:00
draft = false

+++

# vscode 配置

使用 VSCODE 写代码还是很爽的，因为有非常充裕的插件，多种语言的支持，并解决了我远程写代码无法同时看到输出的痛点。

## 为R配置VSCODE

1. 安装`VSCODE-R`插件，这是一个综合性的插件

2. `R`中安装必要的R包：

   > install.packages("languageserver") # 沟通VSCODE与R
   > install.packages("httpgd") # VSCODE画图展示用
   >
   > install.packages("remotes") 
   >
   > remotes::install_github("r-lib/styler") # 用于格式化代码

3. 一些配置：

   > 文件 => 首选项 => 设置 
   >
   > - 搜索r.br，勾选R: Bracketed Paste
   > - 搜索httpgd，勾选R › Plot: Use Httpgd
   > - 搜索shell wind，勾选git bash

4. 快捷键

   - `alt + -`输入 `<-`
   - `alt + =` 输入管道 `%>%`
   - `ctrl + enter` 运行代码

   `ctrl+shift+p`打开`keybindings.json`文件，填入以下内容：

   ```
     {
       "key": "alt+-",
       "command": "editor.action.insertSnippet",
       "when": "editorTextFocus&&editorLangId=='r'",
       "args": {
         "snippet": " <- "
       }
     },
     {
       "key": "alt+=",
       "command": "editor.action.insertSnippet",
       "when": "editorTextFocus&&editorLangId=='r'",
       "args": {
         "snippet": "%>%"
       }
     },
     {
       "key": "ctrl+enter",
       "command": "workbench.action.terminal.runSelectedText",
       "when": "editorTextFocus && editorHasSelection"
     },
   ```

## 远程服务器配置

安装`Remote-SSH`与`vscode-pdf`插件，用于查看输出的PDF结果，效果如下：

因为代码并没在服务器上保存，我一般在打开两个vscode程序，一个用来修改与运行代码，另一个专门查看结果。

![实时刷新](D:\OneDrive\OneDrive - hrbmu.edu.cn\桌面\400-生活\备份\markdown-imgs\6.gif)



## 配置Python

1. 安装 `Python` 插件

2. 为了使用`ctrl+enter`运行代码，如下配置快捷键

   > ```py
   > ###############################
   > # 1. Install extension "macros" in Visual Code
   > #
   > # Hit View on top menu
   > # Search for extension named "macros" (by geddski)
   > # Install "macros" extension
   > #
   > ###############################
   > 
   > 
   > ###############################
   > # 2. Add code below to keybindings.json
   > #
   > # Hit <Ctrl> + <Shift> + <P>
   > # Enter in search bar: JSON
   > # Select Open keyboard shortcuts
   > #
   > ###############################
   > 
   > {
   >         "key": "ctrl+enter",
   >         "command": "macros.pythonExecSelectionAndCursorDown",
   >         "when": "editorTextFocus && editorLangId == 'python'"
   >     }
   > 
   > 
   > ###############################
   > # 3. Add code below to settings.json
   > #
   > # Hit <Ctrl> + <Shift> + <P>
   > # Enter in search bar: JSON
   > # Select Open settings 
   > #
   > ###############################
   > ```



## 附录（可以在我配置好的基础上改动）

`setting.json`

```
{
    /*--------------------------------------------------------------
    # 终端配置
    --------------------------------------------------------------*/
    "terminal.integrated.profiles.windows": {
        "PowerShell": {
            "source": "PowerShell",
            "icon": "terminal-powershell"
        },
        "Command Prompt": {
            "path": [
                "${env:windir}\\Sysnative\\cmd.exe",
                "${env:windir}\\System32\\cmd.exe"
            ],
            "args": [],
            "icon": "terminal-cmd"
        },
        "Git-Bash": {
            "path": "C:\\Users\\way\\scoop\\apps\\git\\current\\bin\\bash.exe",
            "args": []
        }
    },
    "terminal.integrated.profiles.linux": {
        "bash": {
            "path": "bash",
            "args": [
                "-l"
            ]
        }
    },
    "terminal.integrated.defaultProfile.windows": "Git-Bash",
    "terminal.integrated.env.windows": {
        "LANG": "C.UTF-8"
    },
    "terminal.integrated.enableMultiLinePasteWarning": "auto",
    "terminal.integrated.inheritEnv": false,
    "terminal.integrated.ignoreBracketedPasteMode": true,
    "terminal.integrated.tabs.location": "left",
    "terminal.integrated.fontFamily": "MesloLGM NF",
    /*--------------------------------------------------------------
    # 语言配置
    --------------------------------------------------------------*/
    "python.defaultInterpreterPath": "C:\\Users\\way\\scoop\\shims\\python.exe",
    "python.linting.pylintEnabled": false,
    "python.linting.flake8Enabled": false,
    "python.linting.enabled": true,
    "r.rterm.windows": "C:\\Users\\way\\scoop\\apps\\miniconda3\\current\\Scripts\\radian.exe",
    "r.rpath.windows": "C:\\Users\\way\\scoop\\apps\\r\\current\\bin\\R.exe",
    "r.alwaysUseActiveTerminal": true,
    "r.bracketedPaste": true,
    "r.plot.useHttpgd": true,
    /*--------------------------------------------------------------
    # 文件和编辑器配置
    --------------------------------------------------------------*/
    "workbench.editorAssociations": {
        "*.ipynb": "jupyter-notebook",
        "*.pptx": "default",
        "*.xlsx": "gc-excelviewer-excel-editor",
        "*.png": "imagePreview.previewEditor",
        "*.tiff": "default"
    },
    "notebook.cellToolbarLocation": {
        "default": "right",
        "jupyter-notebook": "left"
    },
    "notebook.lineNumbers": "on",
    "files.associations": {
        "*.rmd": "rmd",
        "*.R": "r"
    },
    "files.autoSave": "afterDelay",
    "editor.cursorSmoothCaretAnimation": "on",
    "editor.smoothScrolling": true,
    "editor.cursorBlinking": "smooth",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true,
    "editor.formatOnType": true,
    "editor.accessibilitySupport": "off",
    "editor.fontFamily": "'Cascadia Code',Consolas, 'Courier New', monospace",
    "editor.fontLigatures": true,
    "editor.codeLensFontFamily": "'Cascadia Code'",
    "editor.inlayHints.fontFamily": "'Cascadia Code'",
    "editor.wordSeparators": "`~!@#$%^&*()=+[{]}\\|;:'\",<>/?",
    "debug.console.fontFamily": "'Cascadia Code'",
    "scm.inputFontFamily": "'Cascadia Code'",
    "search.followSymlinks": false,
    "workbench.startupEditor": "none",
    "workbench.sideBar.location": "right",
    "workbench.colorTheme": "Default Light Modern",
    "explorer.confirmDelete": false,
    "autoHide.autoHidePanel": false,
    "codesnap.boxShadow": "rgba(0, 0, 0, 0.55) 0px 0px 0px",
    "codesnap.containerPadding": "0em",
    "codesnap.shutterAction": "copy",
    "liveServer.settings.donotShowInfoMsg": true,
    "liveServer.settings.donotVerifyTags": true,
    "copy-path-unixstyle.defaultFormat": "WindowsForwardSlash",
    /*--------------------------------------------------------------
    # 远程配置
    --------------------------------------------------------------*/
    "remote.SSH.remotePlatform": {
        "210.46.80.170": "linux",
        "10.10.110.126": "linux",
        "10.10.110.186": "linux"
    },
    "remote.SSH.useLocalServer": false,
    "remote.SSH.path": "C:\\Windows\\System32\\OpenSSH\\ssh.exe",
    "remote.SSH.useFlock": false,
    /*--------------------------------------------------------------
    # Git 和版本控制配置
    --------------------------------------------------------------*/
    "git.ignoreLegacyWarning": true,
    "git.autofetch": true,
    "git.confirmSync": false,
    "gitlens.defaultDateLocale": null,
    "gitlens.telemetry.enabled": false,
    "git-graph.integratedTerminalShell": "C:\\Users\\way\\scoop\\apps\\git\\current\\bin\\bash.exe",
    /*--------------------------------------------------------------
    # 其他配置
    --------------------------------------------------------------*/
    "security.workspace.trust.untrustedFiles": "open",
    "security.workspace.trust.enabled": false,
    "settingsSync.ignoredExtensions": [
        "c-team.thief-book"
    ],
    "rsp-ui.enableStartServerOnActivation": [
        {
            "id": "redhat.vscode-community-server-connector",
            "name": "Community Server Connector",
            "startOnActivation": true
        }
    ],
    "redhat.telemetry.enabled": true,
    "http.proxy": "socks5://127.0.0.1:7890",
    "http.proxyStrictSSL": false,
    "http.proxySupport": "on",
    "update.enableWindowsBackgroundUpdates": false,
    "update.mode": "none",
    "telemetry.telemetryLevel": "off",
    /*--------------------------------------------------------------
    # VIM 配置
    --------------------------------------------------------------*/
    "vim.normalModeKeyBindings": [
        {
            "before": [
                "g",
                "p",
                "d"
            ],
            "commands": [
                "editor.action.peekDefinition"
            ]
        },
        {
            "before": [
                "g",
                "h"
            ],
            "commands": [
                "editor.action.showDefinitionPreviewHover"
            ]
        },
        {
            "before": [
                "g",
                "i"
            ],
            "commands": [
                "editor.action.goToImplementation"
            ]
        },
        {
            "before": [
                "g",
                "p",
                "i"
            ],
            "commands": [
                "editor.action.peekImplementation"
            ]
        },
        {
            "before": [
                "g",
                "q"
            ],
            "commands": [
                "editor.action.quickFix"
            ]
        },
        {
            "before": [
                "g",
                "r"
            ],
            "commands": [
                "editor.action.referenceSearch.trigger"
            ]
        },
        {
            "before": [
                "g",
                "t"
            ],
            "commands": [
                "editor.action.goToTypeDefinition"
            ]
        },
        {
            "before": [
                "g",
                "p",
                "t"
            ],
            "commands": [
                "editor.action.peekTypeDefinition"
            ]
        },
    ],
    "vim.handleKeys": {
        "<C-c>": false,
        "<C-a>": false,
        "<C-w>": false,
        "<C-v>": false,
        "<C-x>": false,
    },
    "vim.autoSwitchInputMethod.enable": true,
    "vim.autoSwitchInputMethod.defaultIM": "0",
    "vim.autoSwitchInputMethod.obtainIMCmd": "C:\\Users\\way\\scoop\\apps\\im-select-imm\\current\\im-select-cn.exe",
    "vim.autoSwitchInputMethod.switchIMCmd": "C:\\Users\\way\\scoop\\apps\\im-select-imm\\current\\im-select-cn.exe {im}",
    /*--------------------------------------------------------------
    # 语言默认格式化器
    --------------------------------------------------------------*/
    "[jsonc]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    "[r]": {
        "editor.defaultFormatter": "REditorSupport.r"
    },
    "[html]": {
        "editor.defaultFormatter": "vscode.html-language-features"
    },
    "[python]": {
        "editor.formatOnType": true,
        "editor.defaultFormatter": "ms-python.python"
    },
    "[javascript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "vim.useSystemClipboard": true,
    "editor.minimap.enabled": false,
    "codesnap.showWindowControls": false,
    "interactiveWindow.alwaysScrollOnNewCell": false,
    "interactiveWindow.executeWithShiftEnter": false,
    "python.REPL.enableREPLSmartSend": false,
    "macros": { // Note: this requires macros extension by publisher:"geddski" 
        "ExecSelectionAndCursorDown": [
            "workbench.action.terminal.runSelectedText",
            "cursorDown"
        ]
    }
}
```

keybindings.json

```
[
  /*--------------------------------------------------------------
    # R 和 RMarkdown 快捷键
    --------------------------------------------------------------*/
  {
    "key": "alt+-",
    "command": "editor.action.insertSnippet",
    "when": "editorLangId == 'r' || editorLangId == 'rmd' && editorTextFocus",
    "args": {
      "snippet": " <- "
    }
  },
  {
    "key": "alt+=",
    "command": "editor.action.insertSnippet",
    "when": "editorLangId == 'r' || editorLangId == 'rmd' && editorTextFocus",
    "args": {
      "snippet": " %>% "
    }
  },
  // {
  //   "key": "ctrl+enter",
  //   "command": "extension.multiCommand.execute",
  //   "when": "editorLangId == r || editorLangId == markdown && editorTextFocus",
  //   "args": {
  //     "interval": 20,
  //     "sequence": [
  //       "r.runSelection",
  //       {
  //         "command": "workbench.action.terminal.sendSequence",
  //         "args": {
  //           "text": "\u000D"
  //         }
  //       }
  //     ]
  //   }
  // },
  /*--------------------------------------------------------------
    # Python 快捷键
    --------------------------------------------------------------*/
  // {
  //   "key": "ctrl+enter",
  //   "command": "python.execSelectionInTerminal",
  //   "when": "editorTextFocus && !findInputFocussed && !jupyter.ownsSelection && !notebookEditorFocused && !replaceInputFocussed && editorLangId == 'python'"
  // },
  {
    "key": "shift+enter",
    "command": "-python.execSelectionInTerminal",
    "when": "editorTextFocus && !findInputFocussed && !jupyter.ownsSelection && !notebookEditorFocused && !replaceInputFocussed && editorLangId == 'python'"
  },
  {
    "key": "ctrl+enter",
    "command": "macros.ExecSelectionAndCursorDown",
  },
  /*--------------------------------------------------------------
    # 编辑器快捷键
    --------------------------------------------------------------*/
  // {
  //   "key": "ctrl+enter",
  //   "command": "workbench.action.terminal.runSelectedText",
  //   "when": "editorTextFocus && editorHasSelection"
  // },
  {
    "key": "ctrl+shift+f",
    "command": "editor.action.formatSelection",
    "when": "editorHasDocumentSelectionFormattingProvider && editorTextFocus && !editorReadonly"
  },
  {
    "key": "ctrl+k ctrl+f",
    "command": "-editor.action.formatSelection",
    "when": "editorHasDocumentSelectionFormattingProvider && editorTextFocus && !editorReadonly"
  },
  {
    "key": "alt+oem_period",
    "command": "editor.action.triggerSuggest",
    "when": "editorHasCompletionItemProvider && textInputFocus && !editorReadonly"
  },
  {
    "key": "ctrl+i",
    "command": "-editor.action.triggerSuggest",
    "when": "editorHasCompletionItemProvider && textInputFocus && !editorReadonly"
  },
  /*--------------------------------------------------------------
    # 其他快捷键
    --------------------------------------------------------------*/
  {
    "key": "ctrl+l",
    "command": "workbench.action.terminal.clear"
  },
  {
    "key": "alt+n",
    "command": "extension.getNextPage",
    "when": "editorTextFocus"
  },
  {
    "key": "alt+p",
    "command": "extension.getPreviousPage",
    "when": "editorTextFocus"
  },
  /*--------------------------------------------------------------
    # 终端和编辑器焦点切换
    --------------------------------------------------------------*/
  {
    "key": "ctrl+1",
    "command": "workbench.action.terminal.focus"
  },
  {
    "key": "ctrl+1",
    "command": "workbench.action.focusActiveEditorGroup",
    "when": "terminalFocus"
  },
  /*--------------------------------------------------------------
  #' vim
  --------------------------------------------------------------*/
  {
    "key": "h",
    "command": "editor.action.scrollLeftHover",
    "when": "editorHoverFocused"
  },
  {
    "key": "j",
    "command": "editor.action.scrollDownHover",
    "when": "editorHoverFocused"
  },
  {
    "key": "k",
    "command": "editor.action.scrollUpHover",
    "when": "editorHoverFocused"
  },
  {
    "key": "l",
    "command": "editor.action.scrollRightHover",
    "when": "editorHoverFocused"
  },
  {
    "key": "enter",
    "command": "r.runSelection",
    "when": "editorTextFocus && (editorLangId == 'r' || editorLangId == 'rmd') && (vim.mode == 'Normal' || vim.mode == 'Visual' || vim.mode == 'Visual line')"
  },
  {
    "key": "alt+p",
    "command": "extension.vim_ctrl+p",
    "when": "editorTextFocus && vim.active && vim.use<C-p> && !inDebugRepl || vim.active && vim.use<C-p> && !inDebugRepl && vim.mode == 'CommandlineInProgress' || vim.active && vim.use<C-p> && !inDebugRepl && vim.mode == 'SearchInProgressMode'"
  },
  {
    "key": "ctrl+p",
    "command": "-extension.vim_ctrl+p",
    "when": "editorTextFocus && vim.active && vim.use<C-p> && !inDebugRepl || vim.active && vim.use<C-p> && !inDebugRepl && vim.mode == 'CommandlineInProgress' || vim.active && vim.use<C-p> && !inDebugRepl && vim.mode == 'SearchInProgressMode'"
  },
  {
    "key": "alt+n",
    "command": "extension.vim_ctrl+n",
    "when": "editorTextFocus && vim.active && vim.use<C-n> && !inDebugRepl || vim.active && vim.use<C-n> && !inDebugRepl && vim.mode == 'CommandlineInProgress' || vim.active && vim.use<C-n> && !inDebugRepl && vim.mode == 'SearchInProgressMode'"
  },
  {
    "key": "ctrl+n",
    "command": "-extension.vim_ctrl+n",
    "when": "editorTextFocus && vim.active && vim.use<C-n> && !inDebugRepl || vim.active && vim.use<C-n> && !inDebugRepl && vim.mode == 'CommandlineInProgress' || vim.active && vim.use<C-n> && !inDebugRepl && vim.mode == 'SearchInProgressMode'"
  }
]
```

自定义snippets

```
{
	"Annotate steps": {
		"prefix": "annoStep",
		"body": [
			"###### $1"
		]
	},
	"Annotate header": {
		"prefix": "annoHead",
		"body": [
			"# TODO: ${1}",
			"#",
			"# Author: liuwei",
			"# Date:$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
			"###############################################################################"
		]
	},
	"Annotate function": {
		"prefix": "annoFun",
		"body": [
			"#' @description ${1}",
			"#' @param ${2}",
			"#' @param ${3}",
			"#' @output ${4}",
			"#' @example ${5}",
			"#' @author lw"
		]
	},
	"Annotate section": {
		"prefix": "annoSection",
		"body": [
			"###  ${1}",
			"#' ${2}",
			"##################$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE##################",
		],
	},
	"Annotate large section": {
		"prefix": "annoLarge",
		"body": [
			"########################################################",
			"#' ${1}",
			"#######################$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE#######################",
		]
	},
	"Annotate medium section": {
		"prefix": "annoMedium",
		"body": [
			"### ${1}",
			"#' ${2}",
			"################################"
		],
	},
	"Annotate small section": {
		"prefix": "annoSmall",
		"body": [
			"#######",
			"#' ${1}",
			"#######"
		]
	},
	"Annotate mini section": {
		"prefix": "annoMini",
		"body": [
			"#### ${1} ####"
		]
	},
	"Annotate test section": {
		"prefix": "annoTest",
		"body": [
			"########",
			"# $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
			"########",
			"#' -----------测试案例-----------",
			"${1}",
			"#' -----------结束测试-----------",
			"#####################"
		],
	},
	"Annotate install": {
		"prefix": "annoInstall",
		"body": [
			"#######################安装过程#############################",
			"#' ${1}",
			"###########################$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE#######################",
		],
	},
	"Annotate modify": {
		"prefix": "annoModify",
		"body": [
			"#### 修改日志 - $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
			"#' ${1}",
			"##",
		],
	},
	"Annotate js small section": {
		"prefix": "jsSmall",
		"body": [
			"/*--------------------------------------------------------------",
			"#' ${1}",
			"--------------------------------------------------------------*/"
		]
	},
	"Annotate js section": {
		"prefix": "jsSec",
		"body": [
			"/* ----- ${1} ----- */",
			"${2}",
			"/* ----- ${1} ----- */",
		]
	},
	"Annotate js function": {
		"prefix": "jsFun",
		"body": [
			"/**",
			"* @description ${1}",
			"* @param ${2}",
			"* @param ${3}",
			"* @output ${4}",
			"* @example ${5}",
			"* @author ${6}",
			"*/",
		]
	},
	"Annotate HTML section": {
		"prefix": "htSec",
		"body": [
			"<!-- ${1} -->",
			"${2}",
			"<!-- ${1} -->",
		]
	},
}
```

