<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240516212707 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE poster ADD CONSTRAINT FK_2D710CF233E1689A FOREIGN KEY (command_id) REFERENCES command (id)');
        $this->addSql('CREATE INDEX IDX_2D710CF233E1689A ON poster (command_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE poster DROP FOREIGN KEY FK_2D710CF233E1689A');
        $this->addSql('DROP INDEX IDX_2D710CF233E1689A ON poster');
    }
}
