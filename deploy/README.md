## expense-www deployment files (Ansible)

- Targets Ubuntu-based servers (14.04 LTS and 15.10 tested)
- Tested with Ansible 2.2.0

Once your inventory file is set up with one or more `webservers` and `dbservers`, run the `site.yml` playbook to install:

`$ ansible-playbook site.yml`

Up front, you'll be prompted for your Google Maps API key. Other default values are stored in `group_vars/all.yml`, you may want to adjust those to your preferences.

Lastly, the script assumes SSL-protected (HTTPS) connections and will generate a self-signed key and certificate pair to get started.

After installation, the app should be running at:

`https://[YOUR_DOMAIN_OR_IP_ADDRESS][cgi_path]/?key=[access_key]`

e.g.,

`https://10.0.0.1/expense/?key=mykey`

