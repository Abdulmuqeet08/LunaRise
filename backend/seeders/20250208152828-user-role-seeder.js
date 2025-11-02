'use strict';

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('p4u_UserRole', [
      {
        role_Name: 'Guest',
        is_Active: true,
        id_Module_Type: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_Name: 'Admin',
        is_Active: true,
        id_Module_Type: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_Name: 'Doctor',
        is_Active: true,
        id_Module_Type: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_Name: 'Nurse',
        is_Active: true,
        id_Module_Type: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_Name: 'Receptionist',
        is_Active: true,
        id_Module_Type: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_Name: 'Pharmacist',
        is_Active: true,
        id_Module_Type: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_Name: 'Lab Technician',
        is_Active: true,
        id_Module_Type: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_Name: 'Hospital',
        is_Active: true,
        id_Module_Type: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_Name: 'Clinic',
        is_Active: true,
        id_Module_Type: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_Name: 'Diagnostic Center',
        is_Active: true,
        id_Module_Type: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_Name: 'Physiotherapist',
        is_Active: true,
        id_Module_Type: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('p4u_UserRole', null, {});
  }
};

