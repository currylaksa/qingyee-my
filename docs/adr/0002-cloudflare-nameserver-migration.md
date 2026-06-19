# Cloudflare nameservers for qingyee.my

The domain qingyee.my is registered at Exabytes. To serve it from Cloudflare Pages we **move the domain's nameservers from Exabytes to Cloudflare**, rather than keeping DNS at Exabytes and adding a CNAME. Cloudflare then manages DNS, SSL, and apex resolution (CNAME-flattening) automatically — the apex-CNAME problem that Exabytes may not support disappears.

Trade-off / consequence: all existing DNS records on qingyee.my must be recreated in Cloudflare, or they break. Contact email is gmail (no MX on this domain), so there is expected to be nothing to migrate — **verify there are no existing MX/other records before flipping nameservers**. This is the hardest-to-reverse step in the build, hence the record.
