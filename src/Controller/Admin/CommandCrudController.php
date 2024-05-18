<?php

namespace App\Controller\Admin;

use App\Entity\Command;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;

class CommandCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Command::class;
    }

    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->disable(Action::NEW, Action::EDIT);
    }
    
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            AssociationField::new('user')->setLabel('User'),
            TextField::new('location'),
            AssociationField::new('posters')
                ->formatValue(function ($value, $entity) {
                    return implode("<br>", array_map(function ($poster) {
                        return 'ID: ' . $poster->getId() . ', Poster File: ' . $poster->getPosterFile() . ', Artist: ' . $poster->getArtist() . ', Album: ' . $poster->getAlbum();
                    }, $value->toArray()));
                }),


];
}
/*
public function configureFields(string $pageName): iterable
{
return [
IdField::new('id'),
TextField::new('title'),
TextEditorField::new('description'),
];
}
*/
}