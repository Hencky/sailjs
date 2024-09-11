const child_process = require('child_process');

function deleteNodeModulesInWorkspaces() {
  child_process.exec(
    "pnpm -F workspace list | grep workspaces | awk '{print $2}' | xargs -I {} sh -c 'rm -rf {}/node_modules'",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`执行命令时出错: ${error}`);
        return;
      }
      if (stderr) {
        console.error(`错误输出: ${stderr}`);
        return;
      }
      console.log('所有工作区项目的 node_modules 已删除。');
    }
  );
}

deleteNodeModulesInWorkspaces();
