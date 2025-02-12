package org.schemaspy.input.dbms.driver;

import org.schemaspy.input.dbms.exceptions.ConnectionFailure;

import java.sql.Driver;

/**
 * Encapsulates how to access a JDBC driver through class.
 */
public final class DsDriverClass implements Driversource {

    private final Class<Driver> driverClass;
    private final String message;

    public DsDriverClass(final Class<Driver> driverClass, final String message) {
        this.driverClass = driverClass;
        this.message = message;
    }

    @Override
    public Driver driver() {
        try {
            // have to use deprecated method or we won't see messages generated by older drivers
            return this.driverClass.newInstance();
        } catch (Exception exc) {
            throw new ConnectionFailure(this.message, exc);
        }
    }
}
