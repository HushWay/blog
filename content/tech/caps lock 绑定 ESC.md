# caps lock 绑定 ESC

### Windows

1. 使用PowerToys：

   - 下载并安装Microsoft PowerToys。
   - 打开PowerToys并选择“Keyboard Manager”。
   - 打开“Remap a key”。
   - 添加一个新的重映射条目，将“Caps Lock”映射为“Esc”。

2. 使用注册表编辑器：

   - 打开“开始”菜单，搜索并运行“regedit”。

   - 导航到以下路径：`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layout`。

   - 右键点击右侧窗口，选择“新建” > “二进制值”。

   - 命名为“Scancode Map”。

   - 双击新创建的值，输入以下内容：

     ```
     复制代码00 00 00 00 00 00 00 00
     02 00 00 00 1B 00 3A 00
     00 00 00 00
     ```

   - 保存并重新启动计算机。