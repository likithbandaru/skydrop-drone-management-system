DECLARE
  v_start NUMBER;
BEGIN
  SELECT NVL(MAX(customer_id), 0) + 1 INTO v_start FROM CUSTOMER;
  BEGIN
    EXECUTE IMMEDIATE 'CREATE SEQUENCE customer_seq START WITH ' || v_start || ' INCREMENT BY 1';
  EXCEPTION
    WHEN OTHERS THEN
      IF SQLCODE != -955 THEN
        RAISE;
      END IF;
  END;
END;
/

SELECT sequence_name, last_number
FROM user_sequences
WHERE sequence_name = 'CUSTOMER_SEQ';
