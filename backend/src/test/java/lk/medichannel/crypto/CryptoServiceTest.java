package lk.medichannel.crypto;

import org.junit.jupiter.api.Test;
import java.util.Base64;
import static org.junit.jupiter.api.Assertions.*;

class CryptoServiceTest {
    private final String key = Base64.getEncoder().encodeToString(new byte[32]);
    private final CryptoService crypto = new CryptoService(key, key);

    @Test void encryptionRoundTripsAndUsesDifferentCiphertextEachTime() {
        String first = crypto.encrypt("person@example.test");
        String second = crypto.encrypt("person@example.test");
        assertNotEquals(first, second);
        assertEquals("person@example.test", crypto.decrypt(first));
        assertEquals("person@example.test", crypto.decrypt(second));
    }

    @Test void lookupHashIsStableForEmailCasingAndWhitespace() {
        assertEquals(crypto.hmac("person@example.test"), crypto.hmac(" Person@Example.Test "));
        assertEquals(64, crypto.hmac("person@example.test").length());
    }
}
