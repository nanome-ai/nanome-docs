---
title: Enterprise
---

# Enterprise Deployment (Nanome Classic)

<Callout type="warning" title="Nanome Classic (v1.24) only">

This page is for Nanome Classic (v1.24) only. For Nanome XR and Nanome Web on a private VM, the network requirements are in [Getting Started](/getting-started#on-prem) and installation is in Nanome's [v2 deployment guide](https://nanome.ai/deploy). For help with a deployment, contact your enterprise account manager.

</Callout>

Information and resources for on-prem enterprise deployments.

<IconGrid label="Enterprise deployment">
<IconCard icon="topology-star-3" title="Recommended infrastructure" href="#recommended-infrastructure">How network traffic flows in Nanome.</IconCard>
<IconCard icon="server" title="Virtual machines" href="#virtual-machines">Specs for the Private Server and Plugins VMs.</IconCard>
<IconCard icon="wifi" title="Ports" href="#ports">Inbound and outbound ports to open.</IconCard>
<IconCard icon="terminal-2" title="Plugin deployment" href="#plugin-deployment">Deploy plugins, DNS entries and HTTPS.</IconCard>
</IconGrid>

## <AppIcon name="topology-star-3" /> Recommended infrastructure {#recommended-infrastructure}

How network traffic in Nanome works, and the enterprise network infrastructure we recommend:

<vimg src="help/recommended_infrastructure.png" alt="Recommended infrastructure for an enterprise deployment" />

## <AppIcon name="server" /> Virtual machines {#virtual-machines}

Recommended specs:

| | VM #1: Private Server | VM #2: Dedicated Plugins |
| --- | --- | --- |
| Instance | Amazon AWS T2.Medium EC2 Windows 2012 Server or greater, or equivalent | Amazon AWS T2.Medium EC2 Linux machine, or equivalent |
| CPU | 2 vCPUs on a T2.Medium, or 1 quad core CPU such as an Intel Xeon 3440 or E3-1230 on a physical server | 2 vCPUs, equiv. to an Intel Broadwell E5-2686v4 or higher |
| RAM | 4 GB | 4 GB |
| Network | 1 Gbps NIC / uplink port speed | 1 Gbps NIC / uplink port speed |
| Operating system | Windows Server 2012 and above | A Linux based operating system (Ubuntu or CentOS) |
| Storage | 10 GB+ | 30 GB |

## <AppIcon name="wifi" /> Ports {#ports}

### Inbound

| To | Ports | So that |
| --- | --- | --- |
| VM&nbsp;#1 | UDP 5055, 5056; TCP 443, 80, 8888 | The VR devices can reach VM #1 |
| VM&nbsp;#2 | TCP 80, 443 | Plugin webpages (like Vault and Data Table) can connect |

### Outbound, from each VR device

For internal collaboration:

- UDP ports 5055, 5056 towards VM #1
- TCP port 8888 towards VM #1
- TCP ports 80 and 443 towards VM #2
- TCP port 443 open for "api.nanome.ai", "home.nanome.ai" and "cms.nanome.ai"

For external training sessions with Nanome:

- UDP 5055, 5056 towards the DNS "collaboration.nanome.ai"
- TCP 8888 towards the DNS "plugins.nanome.ai"

## <AppIcon name="terminal-2" /> Plugin deployment {#plugin-deployment}

The [Nanome Plugin Deployer README](https://github.com/nanome-ai/nanome-plugin-deployer) has more detail on each step.

<Steps>

1. Provision the Dedicated Plugins Virtual Machine.
2. SSH into the VM, and install Git and Docker.
3. Pull the Nanome Plugin Deployer and run it.
4. Run a Docker container health check.
5. Validate the connection from the VR client.

</Steps>

### Plugins that need DNS entries {#plugins-that-require-dns-entries}

The Data Table, Vault and Quick Drop plugins are hosted differently from other plugins, as DNS entries under your domain.

```
NTS_IP=<NTS_IP>

./deploy.sh -a $NTS_IP \
  --plugin data-table --nginx --url nanome-table.example.com \
  --plugin vault --nginx --url nanome-vault.example.com \
  --service quickdrop --nginx --url nanome-quickdrop.example.com
```

### HTTPS for web plugins and services {#https-for-web-plugins-and-services}

By default, the self-signed certs in the nginx/certs folder are used. To use your own certs, replace *default.crt* and *default.key* with them.
