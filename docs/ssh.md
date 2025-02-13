# ssh

```sh
ssh -L 5455:localhost:5432 smartppdb
```

create key pair for github ci cd

```sh
ssh-keygen -t ed25519 -C "gitcicd@siap-spmb.id" -f C:\Users\admin/.ssh/id_ed25519_git_siap_spmb
```

copy public key to server and then add to `/.ssh/authorized_keys`

```cd
cat ~/.ssh/id_ed25519_git_siap_spmb.pub | ssh user@remote-server-ip "cat >> ~/.ssh/authorized_keys"
```

and copy private key to github
