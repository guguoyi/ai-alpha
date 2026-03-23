# Effective Git

智能 Git 工作流助手，帮助您遵循最佳实践进行代码提交、推送和管理变更。

## 简介

Effective Git 是一个智能的 Git 工作流助手，它能够：
- 分析代码变更并提供提交建议
- 自动检测项目提交规范
- 提供安全的推送操作（带确认机制）
- 智能解决合并冲突
- 快速执行常用 Git 命令

## 快速开始

### 获取帮助

```bash
# 显示使用指南
./scripts/show_help.sh

# 查看最佳实践
./references/best-practices.md

# 查看冲突解决指南
./references/conflict-resolution.md

# 查看快速命令列表
./references/quick-commands.md
```

## 核心功能

### 1. 快速操作模式 (Quick Operations)

使用 `gq` 前缀执行快速、只读的 Git 操作：

```bash
# 分支操作
gq b:l          # 列出所有分支
gq b-> main     # 切换到 main 分支
gq b:n feature  # 创建新分支
gq b:d old      # 删除分支

# 状态查看
gq s            # 简短状态
gq l            # 最近提交
gq d            # 查看变更

# 暂存操作
gq st:s         # 暂存变更
gq st:p         # 弹出暂存
```

完整命令列表请参考 [quick-commands.md](references/quick-commands.md)。

### 2. 完整工作流模式 (Full Workflow)

对于提交、推送、合并等操作，使用自然语言描述：

```bash
# 提交代码（自动分析变更并提供建议）
"帮我提交代码"

# 推送代码（带安全检查）
"推送代码到远程"

# 解决冲突
"解决合并冲突"
```

#### 完整工作流步骤

1. **分析变更**
   ```bash
   ./scripts/analyze_changes.sh
   ```
   了解当前分支、未提交变更、最近提交历史。

2. **确定提交策略**
   
   系统会自动判断应该使用 `git commit --amend` 还是创建新提交：
   
   - **使用 amend**：修复上次提交的小问题、添加遗漏文件、上次提交未推送
   - **使用新提交**：新的逻辑单元、上次提交已推送、变更与上次无关

3. **检查项目规范**
   
   自动分析最近提交历史，检测：
   - 提交前缀（feat:, fix:, chore: 等）
   - 工单引用（#123, JIRA-456）
   - 表情符号使用（✨, 🐛, 📝）
   - 大小写风格

4. **编写提交信息**
   
   遵循最佳实践：
   - 使用祈使语气（"Add feature" 而非 "Added feature"）
   - 主题行不超过 50 字符
   - 具体且描述性

5. **安全推送**
   
   仅推送到当前分支，显示将要推送的内容并请求确认。

## 最佳实践

### 提交信息规范

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型说明：**
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式（无逻辑变更）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 维护任务

**示例：**
```
feat(auth): add OAuth2 login support

Implement OAuth2 authentication flow with Google and GitHub providers.
Users can now sign in using their existing accounts.

Closes #123
```

### 危险操作

以下操作需要用户确认：
- `git push --force` / `git push -f`
- `git reset --hard`
- `git clean -fd`
- `git rebase` 在共享分支上
- `git branch -D`（强制删除）
- 任何重写历史的操作

## 冲突解决

### 核心原则：绝不丢失代码

解决冲突时的绝对优先级是保留所有代码。如果无法自信地解决，必须：
1. 清晰总结冲突
2. 向用户展示两个版本
3. 请求指导
4. **绝不**自动选择一方

### 冲突解决工作流

1. **保存合并前状态**
   ```bash
   ./scripts/save_diff.sh
   git branch <current-branch>-backup
   ```

2. **检测和分析冲突**
   ```bash
   ./scripts/analyze_conflicts.sh
   ./scripts/visualize_conflicts.sh
   ```

3. **分析每个冲突**
   - 我们的分支（HEAD/current）改变了什么
   - 他们的分支（incoming）改变了什么
   - 共同祖先（base）是什么

4. **确定解决策略**
   - **保留双方（合并）**：两个变更都有价值且兼容
   - **保留我们的（HEAD）**：我们的变更更新/更完整
   - **保留他们的（Incoming）**：他们的变更更正确/完整
   - **重写**：两边都有问题，创建更好的解决方案
   - **询问用户**：无法自信决定

5. **验证无代码丢失**
   ```bash
   git diff <branch>-backup <branch>
   ```

详细指南请参考 [conflict-resolution.md](references/conflict-resolution.md)。

## 脚本工具

### analyze_changes.sh
分析当前 Git 状态，包括分支、未提交变更、最近提交。

### analyze_conflicts.sh
分析合并冲突，提供三路对比视图。

### git_quick.sh
执行快速 Git 命令（gq 命令的后端实现）。

### save_diff.sh
保存当前变更的快照，用于冲突解决前的备份。

### show_help.sh
显示使用帮助信息。

### visualize_conflicts.sh
可视化展示冲突文件和冲突标记。

## 常用工作流

### 特性分支工作流

```bash
# 1. 从 main 创建特性分支
gq b:n feature/new-feature

# 2. 开发并提交
# ... 编写代码 ...
./scripts/analyze_changes.sh
# 根据建议提交

# 3. 保持与 main 同步
git fetch origin
git rebase origin/main

# 4. 推送并创建 PR
git push origin HEAD
```

### 修复紧急 Bug

```bash
# 1. 切换到 main 并创建修复分支
gq b-> main
gq b:n fix/critical-bug

# 2. 修复并提交
# ... 修复代码 ...
gq c "fix: resolve critical bug in auth"

# 3. 推送
git push origin HEAD
```

### 清理提交历史

```bash
# 交互式 rebase 整理最近 3 个提交
git rebase -i HEAD~3

# 或者使用 amend 修复上次提交
git commit --amend
```

## 注意事项

1. **永远不要**在共享分支上执行 `git push --force`
2. **总是**在危险操作前创建备份分支
3. **仔细审查** `git diff` 输出后再提交
4. **保持提交原子性**：一个逻辑变更 = 一个提交
5. **及时删除**已合并的分支

## 许可证

MIT License
