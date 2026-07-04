import json

# Read the current web credentials
with open('credentials.json', 'r') as f:
    web_creds = json.load(f)

# Convert web credentials to installed app format
if 'web' in web_creds:
    web_data = web_creds['web']
    installed_creds = {
        "installed": {
            "client_id": web_data['client_id'],
            "project_id": web_data['project_id'],
            "auth_uri": web_data['auth_uri'],
            "token_uri": web_data['token_uri'],
            "auth_provider_x509_cert_url": web_data['auth_provider_x509_cert_url'],
            "client_secret": web_data['client_secret'],
            "redirect_uris": ["http://localhost"]
        }
    }
    
    # Save as desktop app credentials
    with open('credentials_desktop.json', 'w') as f:
        json.dump(installed_creds, f, indent=2)
    
    print("✅ Converted web credentials to desktop app format")
    print("💡 Try using 'credentials_desktop.json' in your script")
    print("⚠️  You still need to configure the OAuth consent screen properly")
else:
    print("❌ Credentials are already in the correct format")