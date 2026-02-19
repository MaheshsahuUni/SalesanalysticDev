module.exports = async function (context, req) {
  try {
    const container = req.query.container || "excel-files";
    
    // Get SAS token from environment variable (set by GitHub Actions)
    const sasToken = process.env.SAS_TOKEN;
    
    if (!sasToken) {
      context.res = {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "SAS token not configured",
          details: "SAS_TOKEN environment variable not found"
        })
      };
      return;
    }

    // Your storage account name
    const storageAccountName = "bnlwestgunileveraf00600";
    
    // Build the SAS URL
    const sasUrl = `https://${storageAccountName}.blob.core.windows.net/${container}?${sasToken}`;

    context.res = {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sasUrl: sasUrl
      })
    };
  } catch (error) {
    context.res = {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error: "Server error",
        details: error.message
      })
    };
  }
};
