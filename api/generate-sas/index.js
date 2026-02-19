module.exports = async function (context, req) {
  const container = req.query.container || "excel-files";
  
  // Get SAS token from environment variable (set by GitHub Actions)
  const sasToken = process.env.SAS_TOKEN;
  
  if (!sasToken) {
    context.res = {
      status: 500,
      body: {
        error: "SAS token not configured"
      }
    };
    return;
  }

  // Your storage account name
  const storageAccountName = "your-storage-account-name"; // Change this to your storage account
  
  // Build the SAS URL
  const sasUrl = `https://${storageAccountName}.blob.core.windows.net/${container}?${sasToken}`;

  context.res = {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: {
      sasUrl: sasUrl
    }
  };
};
