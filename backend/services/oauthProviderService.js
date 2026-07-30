const { verifyGoogleIdToken } = require('./googleAuthService');

/**
 * Provider-agnostic OAuth Verification Abstract Interface
 * Easily extensible for GitHub, Microsoft, Apple, Facebook, LinkedIn
 */
class OAuthProviderService {
  static async verifyToken(provider, credentialToken) {
    switch (provider.toLowerCase()) {
      case 'google':
        return await verifyGoogleIdToken(credentialToken);
      
      case 'github':
        throw new Error('GitHub OAuth provider configuration pending');
      
      case 'microsoft':
        throw new Error('Microsoft OAuth provider configuration pending');

      case 'apple':
        throw new Error('Apple OAuth provider configuration pending');

      case 'facebook':
        throw new Error('Facebook OAuth provider configuration pending');

      case 'linkedin':
        throw new Error('LinkedIn OAuth provider configuration pending');

      default:
        throw new Error(`Unsupported OAuth provider: ${provider}`);
    }
  }
}

module.exports = OAuthProviderService;
