package lk.medichannel.crypto;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.*;
import javax.crypto.spec.GCMParameterSpec;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.util.*;

@Service
public class CryptoService {
    private final SecretKey encryptionKey; private final SecretKey hmacKey; private final SecureRandom random = new SecureRandom();
    public CryptoService(@Value("${app.encryption.key-base64:}") String encryption, @Value("${app.hmac.key-base64:}") String hmac) {
        encryptionKey = key(encryption, "APP_ENCRYPTION_KEY_BASE64", 32, "AES");
        hmacKey = key(hmac, "APP_HMAC_KEY_BASE64", 32, "HmacSHA256");
    }
    private SecretKey key(String value, String name, int bytes, String algorithm) {
        if (value == null || value.isBlank()) throw new IllegalStateException(name + " must be configured");
        byte[] raw; try { raw=Base64.getDecoder().decode(value); } catch (IllegalArgumentException e) { throw new IllegalStateException(name + " must be Base64", e); }
        if (raw.length < bytes) throw new IllegalStateException(name + " is too short");
        return new javax.crypto.spec.SecretKeySpec(raw, 0, bytes, algorithm);
    }
    public String encrypt(String plaintext) {
        try { byte[] iv=new byte[12]; random.nextBytes(iv); Cipher cipher=Cipher.getInstance("AES/GCM/NoPadding"); cipher.init(Cipher.ENCRYPT_MODE,encryptionKey,new GCMParameterSpec(128,iv)); byte[] encrypted=cipher.doFinal(plaintext.getBytes(StandardCharsets.UTF_8)); byte[] all=new byte[iv.length+encrypted.length]; System.arraycopy(iv,0,all,0,iv.length); System.arraycopy(encrypted,0,all,iv.length,encrypted.length); return Base64.getEncoder().encodeToString(all); }
        catch (GeneralSecurityException e) { throw new IllegalStateException("Unable to encrypt value", e); }
    }
    public String decrypt(String ciphertext) {
        try { byte[] all=Base64.getDecoder().decode(ciphertext); if(all.length<29) throw new IllegalArgumentException("Invalid ciphertext"); byte[] iv=Arrays.copyOfRange(all,0,12); Cipher cipher=Cipher.getInstance("AES/GCM/NoPadding"); cipher.init(Cipher.DECRYPT_MODE,encryptionKey,new GCMParameterSpec(128,iv)); return new String(cipher.doFinal(all,12,all.length-12),StandardCharsets.UTF_8); }
        catch (GeneralSecurityException|IllegalArgumentException e) { throw new IllegalArgumentException("Unable to decrypt value", e); }
    }
    public String hmac(String value) { try { Mac mac=Mac.getInstance("HmacSHA256"); mac.init(hmacKey); return HexFormat.of().formatHex(mac.doFinal(normalize(value).getBytes(StandardCharsets.UTF_8))); } catch (GeneralSecurityException e) { throw new IllegalStateException("Unable to hash value",e); } }
    private String normalize(String v){ return v.trim().toLowerCase(Locale.ROOT); }
}
