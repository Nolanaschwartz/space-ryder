import { exec } from 'child_process';

exec(
  `typeorm-ts-node-commonjs migration:generate -d ./src/database/ormconfig.ts ./src/migrations/${process.argv[2]} `,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  },
);
