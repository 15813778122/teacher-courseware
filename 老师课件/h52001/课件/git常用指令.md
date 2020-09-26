## git常用指令

##### 1、连接远程仓库：先有本地，后有远程

```
1、git init  //本地初始化仓库
2、远程创建仓库  //去到代码托管平台创建远程仓库：码云、gitlab、github都可以
3、git add readme.md //添加readme.md 文件
4、git remote add origin https://github.com/shirley3790/myapp.git //建立本地和远程的连接
5、git push -u origin master  //加了参数-u后，以后即可直接用git push 代替git push origin master
6、git add . //添加全部文件
7、git commit -m"备注信息"
8、git push //提交到远程仓库
```

##### 2、连接远程仓库：先有远程，后有本地

```
1、远程创建仓库  //去到代码托管平台创建远程仓库：码云、gitlab、github都可以
2、git clone https://github.com/shirley3790/myapp.git  //克隆仓库到本地
3、远程创建分支
4、git pull   //本地拉取分支
5、git checkout -b dev origin/dev  //创建本地分支关联远程分支
6、在dev分支开发项目  //vscode写代码
7、提交、推送到远程 //在vscode做即可
8、改动master文件，制作冲突  //提交
9、git merge dev   //回到master分支；合并dev分支；冲突出现，解决冲突
```

建议按照vscode插件：Gitlens （方便解决冲突）

工作中，不建议直接在dev分支做开发，比较容易冲突，最好在dev分支再开一个分支，该分支用于本地开发，不需要提交，开发好一个模块就合并到dev，再提交dev分支。

```
1、git checkout -b malin
2、回到vscode开发项目
3、git checkout dev  //切换回dec分支
4、git pull //拉取,合并之前，先拉取，就可以减少冲突
5、git merge malin
6、git push  //推送dev/
```

##### 3、怎么在分支进行选择性的合并

需求：本来有开发分支dev和生产分支master；开发分支上，有很多的代码文件，准备合并到生产分支，但是不是所有的文件都需要合并，怎么对文件进行选择性的的合并。

```
方案一：不想合并的文件，直接就不提交，设置忽略文件
1、在dev分支生成 .gitignore 文件，里面设置忽略的文件
2、开发项目；
3、git add .
4、git commit -m""
5、git checkout master
6、git pull
7、git merge dev
8、git push

方案二：已经把所有的文件都提交到dev分支，合并的时候master又不想全部合并：https://www.cnblogs.com/xulingfeng/p/5864041.html

1、git branch tmp_dev //到生产分支master上开一个临时的分支
2、git checkout dev //切到dev分支，进行文件拷贝
3、git checkout tem_dev login.txt css/  //进行文件拷贝,把login.txt 和css目录下所有的文件拷贝到临时分支

方案三：用版本管理的方式，选择性合并某个版本：https://www.cnblogs.com/endless-code/p/11093861.html

```

